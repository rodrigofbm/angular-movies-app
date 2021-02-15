import { InputValidationService } from './../../../services/input-validation.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {
  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;

  constructor(public inputValidationService: InputValidationService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.formControlName];
  }
}
