import { UtilsService } from '../../services/utils.service';
import { UserDetails } from '../../models/UserDetails';
import { Deserialize, Serialize } from 'cerialize';
import { StorageListnerService } from '../../services/storage-listner.service';
import { Assets } from '../../models/Assets';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginForm: FormGroup;
  loginResponse = new UserDetails();
  flagForPasswordHideShow: boolean;
  hide = true;
  userOb = {
    userNameOrEmail: undefined,
    password: undefined
  };
  constructor(public utilsService: UtilsService, public storageService: StorageListnerService, public _formBuilder: FormBuilder) { this.flagForPasswordHideShow = false; }

  applyValidation(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_USER_NAME_WITH_DOT)])]],
      password: ['', Validators.compose([Validators.required])]
    });
  }


  loginAPI() {
    if (this.loginForm.valid) {

      const formData = new FormData();
      formData.set('username', this.userOb.userNameOrEmail);
      formData.set('hash_password', this.userOb.password);

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.loginAPI, formData, (response, isResponseOnPage) => {
        console.log('response => ', response);

        if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
          console.log(response);

          this.loginResponse = Deserialize(response['user_details'], UserDetails);
          this.setLocalStorage(this.loginResponse).then(() => {
            this.utilsService.setArrayPermssiontoAssets();
            this.utilsService.arrayOfSelectedFiles = new Array<Assets>();
            this.utilsService.flagForhideShowUploadingFiles = false;
            this.utilsService.redirectTo('/admin/work_area/dashboard');
            this.utilsService.getOrganizationDetailsAPI();
          });
        }
      });
    }

  }


  setLocalStorage(loginResponse: UserDetails) {
    const promise = new Promise((resolve, reject) => {
      try {
        this.storageService.store('user', JSON.stringify(loginResponse));
        this.storageService.store('token', Deserialize(loginResponse.api_token));
        resolve();
      } catch (error) {
        reject();
      }
    });
    return promise;
  }

}
