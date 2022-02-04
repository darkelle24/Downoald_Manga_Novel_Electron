import { Directive, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { SiteManga } from 'models/siteModels';

@Directive({
  selector: '[URLValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: URLValidatorDirective, multi: true }
  ]
})
export class URLValidatorDirective implements Validator {
  @Input("URLValidator") listValidUrl: SiteManga[] = [];
  constructor() { }


  validate(c: FormControl) {
    if (c.value === '') {
      return null
    }
    for (const url of this.listValidUrl) {
      for (const oneDomaine of url.domaine) {
        if (c.value.startsWith(oneDomaine)) {
          return null
        }
      }
    }
    return {URLValidator: true}
  }
}
