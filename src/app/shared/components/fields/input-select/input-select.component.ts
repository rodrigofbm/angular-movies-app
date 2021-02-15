import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { InputValidationService } from './../../../services/input-validation.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent{
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Input() title: string;
  @Input() selects: [{value:string, name:string}];

  constructor(public inputValidationService: InputValidationService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.formControlName];
  }

}
