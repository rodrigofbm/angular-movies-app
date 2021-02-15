import { FormGroup, AbstractControl } from '@angular/forms';
import { InputValidationService } from './../../../services/input-validation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {
  @Input() title: string;
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  constructor(public inputValidationService: InputValidationService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.formControlName];
  }
}
