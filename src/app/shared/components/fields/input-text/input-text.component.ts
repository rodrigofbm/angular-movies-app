import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputValidationService } from './../../../services/input-validation.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  @Input() title: string;
  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  constructor(public inputValidationService: InputValidationService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.formControlName];
  }
}
