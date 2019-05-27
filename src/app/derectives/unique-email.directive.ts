import { Directive } from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appUniqueEmail]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true}]
})
export class UniqueEmailDirective implements AsyncValidator {

  constructor(private authService: AuthService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkEmail(control.value).pipe(
      map(res => {
        return res && res.success === false ? {loginExists: true} : null;
      })
    );
  }
}
