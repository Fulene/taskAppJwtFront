import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomFormValidatorsService {
  static pwdConfirmationValidator(
    ctrl: AbstractControl
  ): ValidationErrors | null {
    const newPwdCtrl: AbstractControl | null = ctrl.get('newPassword');
    const confirmPwdCtrl: AbstractControl | null =
      ctrl.get('newPasswordConfirm');
    if (newPwdCtrl?.pristine || newPwdCtrl?.value === confirmPwdCtrl?.value)
      return null;

    return { pwdConfirmationError: true };
  }
}
