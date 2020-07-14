import { UtilsService } from '../../services/utils.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  forgotPwdForm: FormGroup;
  email: string;
  constructor(public utilsService: UtilsService, public formBuilder: FormBuilder) { }


  applyValidation(): void {
    this.forgotPwdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_USER_NAME_WITH_DOT)])]],
    });
  }

  forgotPasswordAPI() {
    const formData = new FormData();
    formData.set('username', this.email);
    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.forgotPasswordAPI, formData, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {

      }
    });
  }

}
