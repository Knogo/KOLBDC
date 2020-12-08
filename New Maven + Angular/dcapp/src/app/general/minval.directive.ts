import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[minval]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinvalDirective, multi: true }
  ]
})
export class MinvalDirective {
  @Input("minval") minval: number;

  constructor() { }

  validate(c: FormControl) {
    let v: number = +c.value;
    if (isNaN(v)) {
      return { 'minval': true, 'minvalM': 'You must enter a number' }
    }
    if (v < +this.minval) {
      return { 'minval': true, 'minvalM': 'You must enter a number no less than ' + this.minval  }
    }
    return null;
  }
}
