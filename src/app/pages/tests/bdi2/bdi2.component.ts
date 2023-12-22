import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';
import { PatientService } from 'src/app/services/patient.service';
import { VersionService } from 'src/app/services/version.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';

export interface Option {
  id: string;
  value: string;
  label: string;
}

export interface Question {
  description: string;
  options: Option[];
}

export interface Subcategory {
  name: string;
  questions: Question[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

@Component({
  selector: 'app-bdi2',
  templateUrl: './bdi2.component.html',
  styleUrls: ['./bdi2.component.css']
})
export class Bdi2Component implements OnInit {

  versionId = 'a19af926-bc56-46a7-a4a3-0bac246dbef9';
  employeeId = '';

  public form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    public versionService: VersionService,
    private answerService: AnswerService,
    public patientService: PatientService,
    private toastrService: NbToastrService,
    private router: Router) {
    this.form = this.fb.group({
      patientId: [null, Validators.required],
      selectedOptions: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    const localEmployee = localStorage.getItem('employee_data_psico_test') ?? '';
    const employee = JSON.parse(localEmployee)
    this.employeeId = employee.id;
    this.patientService.findByEmployeeId(this.employeeId).subscribe();
    this.versionService.findFullById(this.versionId).subscribe();
  }

  save(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const errors = this.validateOptions();

    if (errors === 0) {
      const selectedValues = this.form.value.selectedOptions;
      console.log('Respuestas guardadas:', JSON.stringify(selectedValues));
      let result = 0;
      for (const key in selectedValues) {
        result += selectedValues[key];
      }

      if (this.form.valid) {
        const data = this.form.value;
        this.answerService.save({
          versionId: this.versionId,
          employeeId: this.employeeId,
          patientId: data.patientId,
          stateId: '5c4121d8-b4e2-45ed-b279-08c021db751b',
          value: JSON.stringify(selectedValues),
          total: result,
          answerStateId: '5c4121d8-b4e2-45ed-b279-08c021db751b'
        }).subscribe((res) => {
          console.log('res', res);
          const newAnswer: Answer = res;
          this.showToast('Éxito', 'Proceso realizado correctamente', 'success');
          this.resetForm();
          this.goToResults(newAnswer.id || '');
        }, err => {
          this.showToast('Error', err, 'danger');
        });
      }
    } else {
      // alert('Todas las preguntas son obligatorias');
      this.showToast('Atención', 'Todas las preguntas son obligatorias', 'warning');
    }
  }

  goToResults(id: String) {
    this.router.navigate(['/results/'+ id]);
  }

  showToast(title: String, description: String, status: NbComponentStatus) {
    this.toastrService.show(description, title, {status});
  }

  validateOptions() {
    const selectedValues = this.form.value.selectedOptions;
    let error = 0;
    for (const key in selectedValues) {
      if (selectedValues[key] === '') {
        error++;
      }
    }
    return error;
  }

  getFormControl(questionId: string): FormControl {
    const selectedOptions = this.form.get('selectedOptions') as FormGroup;

    if (!selectedOptions.get(questionId)) {
      selectedOptions.addControl(questionId, this.fb.control(''));
    }

    return selectedOptions.get(questionId) as FormControl;
  }

  setFormControl(): void {
    this.form = this.fb.group({
      patientId: [null, Validators.required],
      selectedOptions: this.fb.group({}),
    });
  }

  resetForm(): void {
    this.setFormControl();
  }

}
