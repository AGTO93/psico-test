import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: Array<User> = [];
  tmpDataList: Array<User> = [];

  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  data: User = {};

  form: FormGroup = new FormGroup({});

  constructor(public userService: UserService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService) {
    this.findAll();
  }

  ngOnInit(): void {
    this.setFormControl();

  }

  findAll() {
    this.userService.findAll().subscribe();
    setTimeout(() => {
      console.log('users', this.userService.userList);
      this.userList = this.userService.userList;
      this.collectionSize = this.userList.length;
      this.refreshTable();
    }, 200);
  }

  setFormControl(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      enabled: [null, [Validators.required]],
    });
  }

  setValues(): any {
    return this.form.value;
  }

  save(): void {
    if (this.form.valid) {
      console.log('form', this.setValues());
      if (this.data?.id) {
        // editar
        const updateData = this.setValues();
        updateData.id = this.data.id;
        this.edit(updateData);
      } else {
        // nuevo
        console.log('Creando nuevo usuario...');
        this.userService.save(this.setValues()).subscribe((res => {
          this.toastrService.show('Éxito', 'Proceso realizado correctamente', { status: 'success' });
          this.resetForm();
          this.findAll();
        }), err => {
          console.log('err', err);
          this.toastrService.show(err.error.message, 'Error', { status: 'danger' });
        });
      }
    }
  }

  edit(data: User) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea editar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('update dat', data);
          this.userService.update(data).subscribe((res => {
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

  delete(data: User): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Atención',
        message: '¿Está seguro que desea eliminar el siguiente registro?',
      },
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          console.log('id', data.id);
          this.userService.delete(data.id).subscribe((res => {
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

  editInForm(data: any): void {
    this.form = this.fb.group({
      username: [data.username, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null],
      enabled: [data.enabled, [Validators.required]],
    });
    this.data = data;
  }

  resetForm(): void {
    this.setFormControl();
    this.data = {};
  }

  refreshTable() {
    this.tmpDataList = this.userList
      .map((data: any, i: number) => ({ id: i + 1, ...data }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  showToast(title: String, description: String, status: NbComponentStatus) {
    this.toastrService.show(description, title, { status });
  }

}
