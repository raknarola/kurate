import { UtilsService } from '../../services/utils.service';
import { Assets } from '../../models/Assets';
import { Deserialize, Serialize } from 'cerialize';
import { Share } from '../../models/Share';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { Collection } from '../../models/Collection';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SharedAssetListService {
    sharedAssetsObj = new Share();
    shareLink: string;
    flagForHideShowListView: boolean;
    expiryDate: string;
    todayDate = new Date();
    flagForHideShowBackButton: boolean;
    shareForm: FormGroup;
    shareObj = new Share();
    assetsIdForCreateShare: number;
    fileUrl: SafeResourceUrl;
    assetIdForDelete: number;
    assetsIdForAssignCollection: number;
    flagForAccessType: boolean;
    allCollections: Array<Collection> = new Array<Collection>();
    selectedCollectionsIds = new Array<number>();
    statusOfAction: string;
    orderBy: string;
    reverseFlag: boolean;
    value: boolean;
    arrayForSortingKeys: any;
    caseInsensitive: boolean;

    constructor(
        public utilsService: UtilsService,
        public route: ActivatedRoute,
        public datepipe: DatePipe,
        public http: HttpClient,
        public formBuilder: FormBuilder,
        public sanitizer: DomSanitizer
    ) {
        this.flagForHideShowBackButton = false;
        this.value = false;
        this.orderBy = 'created_at';
        this.reverseFlag = true;
        this.caseInsensitive = true;
        this.flagForHideShowListView = false;
        this.flagForAccessType = false;
        this.utilsService.flagForHideMenuForShareLinkPage = true;
        this.utilsService.flagForHideHeaderSearch = true;
        this.arrayForSortingKeys = [
            { key: 'name', value: 'File Name' },
            { key: 'created_at', value: 'Created Date' },
            { key: 'updated_at', value: 'Modified Date' }
        ];
    }

    comparator(valueA, valueB) {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    }

    changeListView(type: string) {
        if (type === 'GridView') {
            this.flagForHideShowListView = false;
        } else if (type === 'ListView') {
            this.flagForHideShowListView = true;
        }
    }

    changeAccessType(value) {
        // this.flagForAccessType = !this.flagForAccessType;
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;
        }
    }

    getFileExtension(fileName) {
        const splifileName = fileName.split('.');
        const splitArrayLength = splifileName.length - 1;
        const extension = splifileName[splitArrayLength];
        return extension;
    }

    getAllAssets(token, idForFolder) {
        console.log('token => ', token);
        console.log('isForFolder => ', idForFolder);
        const formData = new FormData();
        formData.set('token', token);
        if (!this.utilsService.isNullUndefinedOrBlank(idForFolder)) {
            formData.set('parent_id', idForFolder);
        }
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listShareAsstesAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                this.sharedAssetsObj = Deserialize(response[0], Share);
            }
        }, false, token);
    }

    redirectToAssetsDetails(idOfAssets, assetType) {
        if (assetType === 'folder') {
            this.getAllAssets(this.statusOfAction, idOfAssets);
            this.flagForHideShowBackButton = true;
        } else {
            this.utilsService.redirectTo('/share/assets-details/' + this.statusOfAction + '/' + idOfAssets);
        }
    }

    openFolder(obj: Assets) {

        if (obj.asset_type === 'folder') {

            this.getAllAssets(this.statusOfAction, obj.id);
            this.flagForHideShowBackButton = true;
        }
    }

    BackToAllAssets() {
        this.flagForHideShowBackButton = false;
        this.getAllAssets(this.statusOfAction, undefined);

    }

    downloadAssetAPI(idOfAsset) {
        const formData = new FormData();
        formData.set('asset_id', idOfAsset);
        formData.set('token', this.statusOfAction);

        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.downloadShareIndividualAssetAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                console.log('downloaded');
            }
        });
    }

    download(docId, docName, assetType) {
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

                    if (assetType === 'folder') {
                        docName += '.zip';
                    }
                    this.utilsService.download(res['download_url'], docName.replace(/[^a-zA-Z0-9.]/g));
                    this.utilsService.loaderStart--;
                    // FileSaver.saveAs(this.domSanitizer.bypassSecurityTrustUrl(res['download_url']), docName.replace(/[^a-zA-Z0-9.]/g, ''));
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
                console.log('Assets Deleted Successfully');
                this.utilsService.hideModal('deleteAssetModal');
                this.getAllAssets(this.statusOfAction, 0);
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

    sortBy(key) {
        console.log(key);

        this.orderBy = key;
        // this.reverseFlag = false;
        // this.utilsService.allAssets.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
    orderByASCDESC(key) {
        if (key === 'ASC') {
            this.reverseFlag = false;
        } else {
            this.reverseFlag = true;
        }
    }

}
