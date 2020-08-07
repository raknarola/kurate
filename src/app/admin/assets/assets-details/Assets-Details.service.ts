import { UtilsService } from '../../../services/utils.service';
import { Assets } from '../../../models/Assets';
import { Deserialize, Serialize } from 'cerialize';
import { Share } from '../../../models/Share';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collection } from '../../../models/Collection';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { MetaData } from '../../../models/Meta-Data';

export interface Tag {
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class AssetsDetailsService {

    expiryDate: string;
    todayDate = new Date();
    shareLink: string;
    statusOfAction: string;
    assetObj = new Assets();
    assetsVersionArray = new Assets();
    objectEntries = Object.keys;
    selectedItem = new Assets();
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
    metaFieldsForm: FormGroup;
    arrayOfMetaData: Array<MetaData> = new Array<MetaData>();
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    showHideMetadata: boolean;
    assetDate: any;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    arrayOfUserTag: Array<Tag> = new Array<Tag>();
    arrayOfSmartTag: Array<Tag> = new Array<Tag>();
    arrayForSaveMetaFields: Array<{
        asset_id: number, meta_field_id: number, value: any
    }> = new Array<{ asset_id: number, meta_field_id: number, value: any }>();
    title: string;
    description: string;
    useTillDate: Date;
    values: any;
    flagForBreadCrumb: boolean;
    isVersionPermission: boolean;

    constructor(
        public utilsService: UtilsService,
        public router: Router,
        public route: ActivatedRoute,
        public datepipe: DatePipe,
        public http: HttpClient,
        public formBuilder: FormBuilder,
        public sanitizer: DomSanitizer
    ) {
        this.showHideMetadata = false;
        this.flagForBreadCrumb = false;
        this.isVersionPermission = false;
        this.assetObj.meta_data = new Object();
        this.applyMetaForm();
        this.getMetaFields();
        if (this.utilsService.isNullUndefinedOrBlank(this.utilsService.allPermissions) && !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('permission'))) {
            this.utilsService.allPermissions = localStorage.getItem('permission');
        }
    }

    onChangeAssetKeys() {
        // console.log(this.values);
    }

    BackToAllAssets() {
        this.utilsService.flagForHideShowBackButton = false;
        this.utilsService.keyForFolderName = undefined;
        this.utilsService.isBreadCrumb = false;
        this.utilsService.assetIdForGetFolderAssetsOnDelete = undefined;
        this.utilsService.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
        const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
        if (index !== -1) {
            this.utilsService.allPermissions = '/';
        } else {
            this.utilsService.allPermissions = undefined;
        }
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.arrayOfBreadCrumb)) { }
        localStorage.removeItem('permission');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        this.BacktoAssets(false);
    }

    gotoBreadCrumb(idOfAsset: number, index, folderName) {
        const length = this.utilsService.arrayOfBreadCrumb.length - 1;
        if (index !== length) {
            this.utilsService.arrayOfBreadCrumb.splice(index + 1);
            if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.arrayOfBreadCrumb)) {
                // tslint:disable-next-line:no-shadowed-variable
                const newObj = this.utilsService.arrayOfBreadCrumb.filter((val, index1) => {
                    if (index === index1) {
                        val.isActive = true;
                    } else {
                        val.isActive = false;
                    }
                });
                const key2 = this.utilsService.keyForFolderName.split('/');
                const filtered = key2.filter(function (el) { return el !== ''; });
                filtered.splice(index + 1);
                this.utilsService.keyForFolderName = filtered.join('/');
                const index1 = this.utilsService.arrayOfPermissionForAssets.findIndex(val => val.name === '/' + this.utilsService.keyForFolderName);
                if (this.utilsService.allPermissions !== '/' && index1 !== -1) {
                    this.utilsService.allPermissions = '/' + this.utilsService.keyForFolderName;
                    localStorage.setItem('permission', this.utilsService.allPermissions);
                }
                localStorage.setItem('breadCrumbs', JSON.stringify(this.utilsService.arrayOfBreadCrumb));
                localStorage.setItem('folderKey', JSON.stringify(this.utilsService.keyForFolderName));
                this.utilsService.assetIdForGetFolderAssetsOnDelete = idOfAsset;
                this.BacktoAssets(true);
            }
        }
    }

    applyMetaForm() {
        this.metaFieldsForm = this.formBuilder.group({
            'title': ['', Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
            'description': [''],
            'useTiilDate': [''],
            'assetKeys': [''],
        });
        // this.shareForm.controls['sharelink'].disable();
    }

    gettwoDecimal(value) {
        return Math.trunc(value);
    }

    add(event: MatChipInputEvent, tagType): void {
        const input = event.input;
        const value = event.value;
        if (tagType === 'User Tag') {
            if ((value || '').trim()) {
                this.arrayOfUserTag.push({ name: value.trim() });
            }
        } else if (tagType === 'Smart Tag') {
            if ((value || '').trim()) {
                this.arrayOfSmartTag.push({ name: value.trim() });
            }
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    BacktoAssets(isBreadcrumbClick: boolean) {
        if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('breadCrumbs'))) {
            let redirectRoute;
            if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('isSearched'))) {
                this.utilsService.flagForHideShowAssestLabel = true;
                if (isBreadcrumbClick === false) {
                    const key2 = this.utilsService.keyForFolderName.split('/');
                    const filtered = key2.filter(function (el) { return el !== ''; });
                    filtered.splice(this.utilsService.arrayOfBreadCrumb.length - 1);
                    this.utilsService.keyForFolderName = filtered.join('/');
                    localStorage.setItem('folderKey', JSON.stringify(this.utilsService.keyForFolderName));
                }
                redirectRoute = '/admin/work_area/assets/search-assets/search';
            } else {
                if (isBreadcrumbClick === false) {
                    const key2 = this.utilsService.keyForFolderName.split('/');
                    const filtered = key2.filter(function (el) { return el !== ''; });
                    filtered.splice(this.utilsService.arrayOfBreadCrumb.length - 1);
                    this.utilsService.keyForFolderName = filtered.join('/');
                    localStorage.setItem('folderKey', JSON.stringify(this.utilsService.keyForFolderName));
                }
                redirectRoute = '/admin/work_area/assets/all-assets';
                this.utilsService.flagForHideShowAssestLabel = false;
            }
            // this.utilsService.arrayOfBreadCrumb = JSON.parse(localStorage.getItem('breadCrumbs'));
            // this.utilsService.keyForFolderName = JSON.parse(localStorage.getItem('breadCrumbs'));
            // this.utilsService.flagForHideShowBackButton = true;
            // this.utilsService.isBreadCrumb = true;
            this.utilsService.redirectTo(redirectRoute);
        } else if (!this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-param')) ||
            !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-tags-param'))) {
            this.utilsService.redirectTo('/admin/work_area/assets/search-assets/search');
        } else {
            this.utilsService.redirectTo('/admin/work_area/assets/all-assets');
        }
    }

    getMetaFields() {
        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getMetaFieldsAPI, param, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.arrayOfMetaData = Deserialize(response, MetaData);
            }
        });
    }

    addMetaVlues(assetID: number) {
        this.arrayForSaveMetaFields = new Array<{ asset_id: number, meta_field_id: number, value: any }>();
        let flag = false;
        this.arrayOfMetaData.filter(val => {
            if (!this.utilsService.isNullUndefinedOrBlank(val.ngModel)) {
                flag = true;
                this.arrayForSaveMetaFields.push({ asset_id: assetID, meta_field_id: +val.id, value: val.input_type === 'DatePicker' ? this.datepipe.transform(new Date(val.ngModel), 'yyyy-MM-dd') : val.ngModel });
            }
        });
        // if (!this.utilsService.isNullUndefinedOrBlank(this.title)) {
        //   const metaId = this.arrayOfMetaData.filter(val => val.input_type === 'InputBox').map(val => val.id).toString();
        //   this.arrayForSaveMetaFields.push({ asset_id: assetID, meta_field_id: +metaId, value: this.title });
        // }
        // if (!this.utilsService.isNullUndefinedOrBlank(this.description)) {
        //   const metaId = this.arrayOfMetaData.filter(val => val.input_type === 'TextArea').map(val => val.id).toString();
        //   this.arrayForSaveMetaFields.push({ asset_id: assetID, meta_field_id: +metaId, value: this.description });
        // }
        // if (!this.utilsService.isNullUndefinedOrBlank(this.useTillDate)) {
        //   const metaId = this.arrayOfMetaData.filter(val => val.input_type === 'DatePicker').map(val => val.id).toString();
        //   const date = new Date(this.useTillDate);
        //   this.arrayForSaveMetaFields.push({ asset_id: assetID, meta_field_id: +metaId, value: this.datepipe.transform(date, 'yyyy-MM-dd') });
        // }
        // if (!this.utilsService.isNullUndefinedOrBlank(this.values)) {
        //   const metaId = this.arrayOfMetaData.filter(val => val.input_type === 'CheckBox').map(val => val.id).toString();
        //   this.arrayForSaveMetaFields.push({ asset_id: assetID, meta_field_id: +metaId, value: this.values });
        // }
        if (flag) {
            const formData = new FormData();
            formData.set('meta_data', JSON.stringify(this.arrayForSaveMetaFields));
            this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.addMetaDataValuesAPI, formData, (response) => {
                if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                    console.log('Meta Fields Saved Successfully');
                }
            });
        }
    }

    remove(tag, tagType): void {
        if (tagType === 'User Tag') {
            const index = this.arrayOfUserTag.indexOf(tag);
            if (index >= 0) {
                this.arrayOfUserTag.splice(index, 1);
            }
        }
    }

    getAssetsDetails(idOfAsset) {
        const formData = new FormData();
        formData.set('asset_id', idOfAsset);
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getAssetDetailsAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.utilsService.loaderStart++;
                this.assetsVersionArray = Deserialize(response, Assets);
                this.assetObj = Deserialize(response[0], Assets);
                if (!this.utilsService.isEmptyObjectOrNullUndefiend(localStorage.getItem('breadCrumbs'))) {
                    this.flagForBreadCrumb = true;
                    this.utilsService.arrayOfBreadCrumb = JSON.parse(localStorage.getItem('breadCrumbs'));
                    const newObj = this.utilsService.arrayOfBreadCrumb.filter(val => {
                        val.isActive = false;
                    });
                    const folderKey = JSON.parse(localStorage.getItem('folderKey').toString());
                    // this.utilsService.keyForFolderName = undefined;
                    this.utilsService.keyForFolderName = folderKey.toString();
                    // localStorage.setItem('folderKey', this.utilsService.keyForFolderName.toString());
                    this.utilsService.arrayOfBreadCrumb.push({ 'asset_id': this.assetObj.id, 'folder_name': this.assetObj.name, 'isActive': true });
                }
                const permission = localStorage.getItem('permission');
                const indexForRootFolder = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === permission);
                if (indexForRootFolder !== -1) {
                    if (this.utilsService.arrayOfPermissionForAssets[indexForRootFolder].isVersion) {
                        this.isVersionPermission = true;
                    } else {
                        this.isVersionPermission = false;
                    }
                }
                if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.assetObj.meta_fields_data)) {
                    this.assetObj.meta_fields_data.filter(val => {
                        const inputType = this.arrayOfMetaData.filter(val1 => val1.id === val.meta_field_id).map(val1 => val1.input_type).toString();
                        const index = this.arrayOfMetaData.findIndex(val1 => val1.id === val.meta_field_id);
                        if (inputType === 'InputBox') {
                            this.arrayOfMetaData[index].ngModel = val.value;
                        }
                        if (inputType === 'TextArea') {
                            // this.description = val.value;
                            this.arrayOfMetaData[index].ngModel = val.value;
                        }
                        if (inputType === 'DatePicker') {
                            // this.useTillDate = new Date(val.value);
                            this.arrayOfMetaData[index].ngModel = new Date(val.value);
                        }
                        if (inputType === 'CheckBox') {
                            // this.values = val.value;
                            this.arrayOfMetaData[index].ngModel = val.value;
                        }
                    });
                }
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
                this.utilsService.loaderStart--;
            }
        });
    }

    saveTags() {
        const formData = new FormData();
        const tagData = [];
        const obj = this.arrayOfUserTag.filter(val => {
            tagData.push(val.name);
        });
        formData.set('tags_data', JSON.stringify(tagData));
        formData.set('asset_id', this.statusOfAction);
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.assignAssetTagAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                // console.log('assetData');
            }
        });
    }

    viewVersionDetails(index) {
        this.assetObj = Deserialize(this.assetsVersionArray[index], Assets);
    }

    applyCollectionValidations() {
        this.shareForm = this.formBuilder.group({
            'shareName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
            'expiry': [''],
            'downloadAllowed': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
            'sharelink': [''],
            'downloadcheckBox': ['']
        });
        // this.shareForm.controls['sharelink'].disable();
    }

    changeAccessType(value) {
        // this.flagForAccessType = !this.flagForAccessType;
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;
        }
    }

    openShareModal(assetObj: Assets) {
        this.assetsIdForCreateShare = this.assetObj.id;
        this.shareLink = undefined;
        this.shareObj.allow_downloads = 999999;
        this.utilsService.openModal('shareassetsModal');
    }

    createShare(assetId) {
        const formData = new FormData();
        this.shareObj.asset_id = assetId;
        this.shareObj.share_type = 0;
        if (!this.utilsService.isNullUndefinedOrBlank(this.shareObj.expire_date)) {
            const date = new Date(this.shareObj.expire_date);
            this.shareObj.expire_date = this.datepipe.transform(date, 'yyyy-MM-dd');
        }
        const obj = Serialize(this.shareObj, Share);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.set(key, obj[key]);
            }
        }

        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.createShareAPI, formData, (response, isResponseOnPage) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                // if (!isResponseOnPage) {
                this.shareObj = Deserialize(response, Share);
                this.shareLink = UtilsService.FRONT_URL + 'share/sharedAssets/' + this.shareObj.link_token;
                // } else {
                //   this.errorArray.push(response);
                // }
            }
        });
    }

    resetShareModal() {
        this.shareObj = new Share();
        this.applyCollectionValidations();
    }

    downloadAssetAPI(idOfAsset) {
        const formData = new FormData();
        formData.set('asset_id', idOfAsset);
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.downloadIndividualAssetAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                // console.log('downloaded');
            }
        });
    }

    download(docId, docName) {
        const headers = new HttpHeaders()
            .append('ChannelID', 'WEB')
            .append('ReqID', '789654')
            .append('RequestDate', Date.parse(new Date().toString()).toString())
            .append('XkurateKey', 'KEY-WEB-#1014')
            .append('ApiToken', this.utilsService.getToken());
        const formData = new FormData();
        formData.set('asset_id', docId);
        this.utilsService.loaderStart++;
        this.http.post(UtilsService.URL +
            this.utilsService.serverVariableService.downloadIndividualAssetAPI,
            formData, { headers: headers }).subscribe((res: any) => {
                if (res['response'] === 0) {
                    this.utilsService.loaderStart--;
                    this.utilsService.toasterService.error(res['message'], '', {
                        positionClass: 'toast-top-right',
                        closeButton: true
                    });
                } else {
                    this.utilsService.download(res['download_url'], docName.replace(/[^a-zA-Z0-9.]/g)).subscribe();
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

    openDeleteAssetModal(id) {
        this.assetIdForDelete = id;
        this.utilsService.openModal('deleteAssetModal');
    }

    deleteAssetById(assetId) {
        const formData = new FormData();
        formData.set('asset_ids', assetId);
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteAssetAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                this.utilsService.hideModal('deleteAssetModal');
                this.BacktoAssets(false);
            }
        }, true);
    }

    getAllCollections() {
        // const formData = new FormData();
        // this.userId = this.utilsService.getLoginUsers().id;
        // formData.set('user_id', this.userId);
        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listCollectionsAPI, param, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.allCollections = Deserialize(response['my_collection'], Collection);
            }
        });
    }

    openAssignModal(assetId) {
        this.selectedCollectionsIds = new Array<number>();
        if (!this.utilsService.isNullUndefinedOrBlank(this.allCollections)) {
            const obj = this.allCollections.filter(val => {
                val.isSelected = false;
            });
        }
        this.utilsService.openModal('colorModal');
        this.assetsIdForAssignCollection = assetId;
    }

    assignColllections(assetsId) {
        const formData = new FormData();
        formData.set('assets_id', assetsId);
        const collectionIds = this.selectedCollectionsIds.join(', ');
        formData.set('collection_ids', collectionIds);
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.addAssetCollectionsAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.utilsService.hideModal('colorModal');
                this.selectedCollectionsIds = null;
            }
        }, true);
    }

    addOrRemoveCollection(isSelected, obj: Collection) {
        if (isSelected === true) {
            this.selectedCollectionsIds.push(obj.id);
        } else if (isSelected === false) {
            const index = this.selectedCollectionsIds.findIndex(val => val === obj.id);
            this.selectedCollectionsIds.splice(index, 1);
        }
    }

    getFileExtension(fileName) {
        const splifileName = fileName.split('.');
        const splitArrayLength = splifileName.length - 1;
        const extension = splifileName[splitArrayLength];
        return extension;
    }

}
