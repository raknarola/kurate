import { UtilsService } from '../../services/utils.service';
import { Assets } from '../../models/Assets';
import { Deserialize, Serialize } from 'cerialize';
import { Share } from '../../models/Share';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { Collection } from '../../models/Collection';
import { Tag } from '../../admin/assets/assets-details/Assets-Details.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class SharedAssetDetailsService {

  expiryDate: string;
  todayDate = new Date();
  shareLink: string;
  statusOfAction: string;
  assetObj = new Assets();
  assetsVersionArray = new Assets();

  shareForm: FormGroup;
  shareObj = new Share();
  assetsIdForCreateShare: number;
  fileUrl: SafeResourceUrl;
  assetIdForDelete: number;
  flagForAccessType: boolean;
  allCollections: Array<Collection> = new Array<Collection>();
  selectedCollectionsIds = new Array<number>();
  assetsIdForAssignCollection: number;
  errorArray = new Array<string>();
  showHideMetadata: boolean;

  visible = true;
  selectable = false;
  removable = false;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  arrayOfUserTag: Array<Tag> = new Array<Tag>();
  arrayOfSmartTag: Array<Tag> = new Array<Tag>();




  constructor(public utilsService: UtilsService, public router: Router, public route: ActivatedRoute, public datepipe: DatePipe, public http: HttpClient, public formBuilder: FormBuilder, public sanitizer: DomSanitizer) {

    this.assetObj.meta_data = new Object();
    this.utilsService.flagForHideMenuForShareLinkPage = true;
    this.showHideMetadata = false;
    this.utilsService.flagForHideHeaderSearch = true;

  }




  // getAssetsDetails(idOfAsset, token) {
  //   const formData = new FormData();

  //   formData.set('asset_id', idOfAsset);

  //   this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getAssetDetailsAPI, formData, (response) => {
  //     if (!this.utilsService.isNullUndefinedOrBlank(response)) {
  //       this.assetObj = Deserialize(response[0], Assets);
  //       console.log(this.assetObj);

  //     }
  //   }, false, token);

  // }
  getAssetsDetails(idOfAsset, token) {
    const formData = new FormData();

    formData.set('asset_id', idOfAsset);
    formData.set('token', token);

    // this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getAssetDetailsAPI, formData, (response) => {
    //   if (!this.utilsService.isNullUndefinedOrBlank(response)) {
    //     this.assetObj = Deserialize(response[0], Assets);
    //     console.log(this.assetObj);

    //   }
    // }, false, token);

    this.http.post(UtilsService.URL + this.utilsService.serverVariableService.getAssetDetailsWithoutHeaderAPI, formData)
      .subscribe(res => {
        console.log(res['result']);

        if (!this.utilsService.isNullUndefinedOrBlank(res)) {
          this.assetsVersionArray = Deserialize(res['result'], Assets);
          this.assetObj = Deserialize(res['result'][0], Assets);
          console.log(this.assetObj);

          this.shareObj = Deserialize(res['share_data'], Share);
          if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.assetObj.user_tags)) {

            const obj1 = this.assetObj.user_tags.filter(val => {
              this.arrayOfUserTag.push({ name: val.trim() });
            });
          }
          if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.assetObj.smart_tags)) {
            const obj2 = this.assetObj.smart_tags.filter(val => {
              this.arrayOfSmartTag.push({ name: val.trim() });
            });
          }
          // this.arrayOfSmartTag = this.assetObj.smart_tags;
          console.log(this.assetObj.smart_tags);
        }
      });
  }

  viewVersionDetails(index) {
    this.assetObj = this.assetsVersionArray[index];
  }


  applyCollectionValidations() {
    this.shareForm = this.formBuilder.group({
      'shareName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
      'expiry': ['', Validators.compose([Validators.required])],
      'downloadAllowed': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
      'sharelink': [''],
      'downloadcheckBox': ['']
    });
    // this.shareForm.controls['sharelink'].disable();
  }


  downloadAssetAPI(idOfAsset) {
    const formData = new FormData();
    formData.set('asset_id', idOfAsset);

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.downloadIndividualAssetAPI, formData, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        console.log('downloaded');
      }
    });
  }

  download(docId, docName) {
    console.log('Download', docId);
    // const headers = new HttpHeaders()
    //   .append('ChannelID', 'WEB')
    //   .append('ReqID', '789654')
    //   .append('RequestDate', Date.parse(new Date().toString()).toString())
    //   .append('XkurateKey', 'KEY-WEB-#1014')
    //   .append('ApiToken', this.statusOfAction);
    const formData = new FormData();

    formData.set('token', this.statusOfAction);
    formData.set('asset_id', docId);
    this.utilsService.loaderStart++;

    this.http.post(UtilsService.URL + this.utilsService.serverVariableService.downloadShareIndividualAssetAPI, formData)
      .subscribe(res => {


        if (res['response'] === 0) {
          this.utilsService.loaderStart--;

          this.utilsService.toasterService.error(res['message'], '', {
            positionClass: 'toast-top-right',
            closeButton: true
          });
        } else {
          // const blob = new Blob([res], { type: 'application/octet-stream' });
          this.utilsService.download(res['download_url'], docName.replace(/[^a-zA-Z0-9.]/g));
          // FileSaver.saveAs(blob, docName);
          this.utilsService.loaderStart--;

        }
      }, err => {
        this.utilsService.loaderStart--;

        if (err['status'] === 403) {
          this.utilsService.toasterService.error('Download limit exceeded', '', {
            positionClass: 'toast-top-right',
            closeButton: true
          });
        }
      });
  }

  getFileExtension(fileName) {
    const splifileName = fileName.split('.');
    const splitArrayLength = splifileName.length - 1;
    const extension = splifileName[splitArrayLength];
    return extension;

  }
}
