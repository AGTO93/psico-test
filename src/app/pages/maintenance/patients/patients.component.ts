import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { Patient } from 'src/app/models/patient.model';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { GenderService } from 'src/app/services/gender.service';
import { PatientService } from 'src/app/services/patient.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patientList: Array<Patient> = [];
  tmpDataList: Array<Patient> = [];

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  data: Patient = {};

  public form: FormGroup = new FormGroup({});

  constructor(public patientService: PatientService,
    public employeeService: EmployeeService,
    public genderService: GenderService,
    public countryService: CountryService,
    public cityService: CityService,
    public documentTypeService: DocumentTypeService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,) {
      this.findAll();
      this.genderService.findAll().subscribe();
      this.countryService.findAll().subscribe();
      this.cityService.findAll().subscribe();
      this.documentTypeService.findAll().subscribe();
      this.employeeService.findAll().subscribe();
    }

  ngOnInit(): void {
    this.setFormControl();
  }

  findAll() {
    this.patientService.findAll().subscribe();
    setTimeout(() => {
      console.log('patients', this.patientService.patientList);
      this.patientList = this.patientService.patientList;
      this.collectionSize = this.patientList.length;
      this.refreshTable();
    }, 200);
  }

  save() {
    if (this.form.valid) {
      console.log('data', JSON.stringify(this.setValues()));
      if (this.data?.id) {
        // editar
        const updateData = this.setValues();
        updateData.id = this.data.id;
        this.edit(updateData);
      } else {
        // nuevo
        console.log('Creando nuevo empleado...');
        this.patientService.save(this.setValues()).subscribe((res => {
          this.toastrService.show('Éxito', 'Proceso realizado correctamente', { status: 'success' });
          this.resetForm();
          this.findAll();
        }), err => {
          console.log('err', err);
          this.toastrService.show(err.error.error || err.error.message, 'Error', { status: 'danger' });
        });
      }
    }
  }

  edit(data: Patient) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea editar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('update dat', data);
          this.patientService.update(data).subscribe((res => {
            this.toastrService.show('Éxito', 'Proceso realizado correctamente', { status: 'success' });
            this.resetForm();
            this.findAll();
          }), err => {
            console.log('err', err);
            this.toastrService.show(err.error.message, 'Error', { status: 'danger' });
          });
        } else {
          this.toastrService.show('Error', 'No se encontró el usuario seleccionado', { status: 'danger' });
        }
      }
    });
  }

  delete(data: Patient) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea eliminar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('id', data.id);
          this.patientService.delete(data.id).subscribe((res => {
            this.toastrService.show('Éxito', 'Proceso realizado correctamente', { status: 'success' });
            this.resetForm();
            this.findAll();
          }), err => {
            console.log('err', err);
            this.toastrService.show(err.error.message, 'Error', { status: 'danger' });
          });
        } else {
          this.toastrService.show('Error', 'No se encontró el usuario seleccionado', { status: 'danger' });
        }
      }
    });
  }

  setValues(): any {
    return this.form.value;
  }

  setFormControl(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      genderId: [null, [Validators.required]],
      documentTypeId: [null, [Validators.required]],
      documentNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      email: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
    });
  }

  editInForm(data: any): void {
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      lastname: [data.lastname, [Validators.required]],
      dateOfBirth: [data.dateOfBirth, [Validators.required]],
      genderId: [data.genderId, [Validators.required]],
      documentTypeId: [data.documentTypeId, [Validators.required]],
      documentNumber: [data.documentNumber, [Validators.required]],
      address: [data.address, [Validators.required]],
      phoneNumber: [data.phoneNumber, [Validators.required]],
      countryId: [data.countryId, [Validators.required]],
      cityId: [data.cityId, [Validators.required]],
      email: [data.email, [Validators.required]],
      employeeId: [data.employeeId, [Validators.required]],
    });
    this.data = data;
  }

  resetForm(): void {
    this.setFormControl();
    this.data = {};
  }

  refreshTable() {
    this.tmpDataList = this.patientList
      .map((data: any, i: number) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  showToast(title: String, description: String, status: NbComponentStatus) {
    this.toastrService.show(description, title, { status });
  }

}
