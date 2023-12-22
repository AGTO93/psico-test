import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSheet } from 'src/app/models/data-sheet.model';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PatientService } from 'src/app/services/patient.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DataSheetService } from 'src/app/services/data-sheet.service';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-data-sheets',
  templateUrl: './data-sheets.component.html',
  styleUrls: ['./data-sheets.component.css']
})
export class DataSheetsComponent implements OnInit {

  dataSheetList: Array<DataSheet> = [];
  tmpDataList: Array<DataSheet> = [];

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  data: DataSheet = {};

  public form: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {}

  /* constructor(public employeeService: EmployeeService,
    public patientService: PatientService,
    public dataSheetService: DataSheetService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.setFormControl();
  }

  findAll() {
    this.dataSheetService.findAll().subscribe();
    setTimeout(() => {
      console.log('employees', this.employeeService.employeeList);
      this.dataSheetList = this.employeeService.employeeList;
      this.collectionSize = this.dataSheetList.length;
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
        this.dataSheetService.save(this.setValues()).subscribe((res => {
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

  edit(data: DataSheet) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea editar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('update dat', data);
          this.dataSheetService.update(data).subscribe((res => {
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

  delete(data: DataSheet) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea eliminar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('id', data.id);
          this.dataSheetService.delete(data.id).subscribe((res => {
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
      patientId: [null, [Validators.required]],
      informant: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      description: [null, [Validators.required]],
      obs: [null, [Validators.required]],
    });
  }

  editInForm(data: any): void {
    this.form = this.fb.group({
      patientId: [data.patientId, [Validators.required]],
      informant: [data.informant, [Validators.required]],
      reason: [data.reason, [Validators.required]],
      description: [data.description, [Validators.required]],
      obs: [data.obs, [Validators.required]],
    });
    this.data = data;
  }

  resetForm(): void {
    this.setFormControl();
    this.data = {};
  }

  refreshTable() {
    this.tmpDataList = this.dataSheetList
      .map((data: any, i: number) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  showToast(title: String, description: String, status: NbComponentStatus) {
    this.toastrService.show(description, title, { status });
  } */

}
