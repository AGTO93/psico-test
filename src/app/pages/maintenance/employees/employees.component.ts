import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { GenderService } from 'src/app/services/gender.service';
import { CountryService } from '../../../services/country.service';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeList: Array<Employee> = [];
  tmpDataList: Array<Employee> = [];

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  data: Employee = {};

  public form: FormGroup = new FormGroup({});

  constructor(
    public employeeService: EmployeeService,
    public genderService: GenderService,
    public countryService: CountryService,
    public cityService: CityService,
    public documentTypeService: DocumentTypeService,
    public userService: UserService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) {
      this.findAll();
      this.genderService.findAll().subscribe();
      this.countryService.findAll().subscribe();
      this.cityService.findAll().subscribe();
      this.documentTypeService.findAll().subscribe();
      this.userService.findAll().subscribe();      
    }

  ngOnInit(): void {
    this.setFormControl();
  }

  findAll() {
    this.employeeService.findAll().subscribe();
    setTimeout(() => {
      console.log('employees', this.employeeService.employeeList);
      this.employeeList = this.employeeService.employeeList;
      this.collectionSize = this.employeeList.length;
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
        this.employeeService.save(this.setValues()).subscribe((res => {
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

  edit(data: Employee) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea editar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('update dat', data);
          this.employeeService.update(data).subscribe((res => {
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

  delete(data: Employee) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea eliminar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('id', data.id);
          this.employeeService.delete(data.id).subscribe((res => {
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
      userId: [null, [Validators.required]],
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
      userId: [data.userId, [Validators.required]],
    });
    this.data = data;
  }

  resetForm(): void {
    this.setFormControl();
    this.data = {};
  }

  refreshTable() {
    this.tmpDataList = this.employeeList
      .map((data: any, i: number) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  showToast(title: String, description: String, status: NbComponentStatus) {
    this.toastrService.show(description, title, { status });
  }

}
