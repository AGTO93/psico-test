import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string = '';
  message: string = '';

  constructor(private dialogRef: NbDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }

  confirm() {
    // Cierra el modal y pasa true a la suscripción onClose
    this.dialogRef.close(true);
  }

  cancel() {
    // Cierra el modal y pasa false a la suscripción onClose
    this.dialogRef.close(false);
  }

}
