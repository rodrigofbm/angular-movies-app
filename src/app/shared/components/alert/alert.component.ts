import { Alert } from './../../models/alert';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dio-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  alert: Alert = {
    title: 'Sucesso',
    description: 'Registro salvo com sucesso!',
    lblSuccess: 'Ok',
    lblClose: null
  }

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert) {}

  ngOnInit(): void {
    this.alert.title = this.data?.title || this.alert.title;
    this.alert.description = this.data?.description || this.alert.description;
    this.alert.lblSuccess = this.data?.lblSuccess || this.alert.lblSuccess;
    this.alert.lblClose = this.data?.lblClose || this.alert.lblClose;
  }
}
