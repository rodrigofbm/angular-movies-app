import { FormGroup, AbstractControl } from '@angular/forms';
import { InputValidationService } from './../../../services/input-validation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent  {
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Input() title: string;

  constructor(public inputValidationService: InputValidationService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.formControlName];
  }
}
