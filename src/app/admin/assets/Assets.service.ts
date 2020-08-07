import { UtilsService } from '../../services/utils.service';
import { Assets } from '../../models/Assets';
import { Deserialize, Serialize } from 'cerialize';
import { Share } from '../../models/Share';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Collection } from '../../models/Collection';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderService } from '../../shared/layout/header/header.service';
import { saveAs } from 'file-saver';
import { Observable, BehaviorSubject } from 'rxjs';
declare var $: any;

@Injectable({
    providedIn: 'root'
})

export class AssetsService {
    orderByForGridView = 'created_at';
    orderByForListView = 'created_at';
    reverseFlagForGridView: boolean;
    reverseFlagForListView: boolean;
    value: boolean;
    caseInsensitive: boolean;
    // allAssets: Array<Assets> = new Array<Assets>();
    shareLink: string;
    flagForHideShowListView: boolean;
    expiryDate: string;
    todayDate = new Date();
    // flagForHideShowBackButton: boolean;
    shareForm: FormGroup;
    shareObj = new Share();
    assetsIdForCreateShare: number;
    fileUrl: SafeResourceUrl;
    fileURL2;
    assetIdForDelete: number;
    assetsIdForAssignCollection: number;
    flagForAccessType: boolean;
    allCollections: Array<Collection> = new Array<Collection>();
    selectedCollectionsIds = new Array<number>();
    errorArray = new Array<string>();
    statusOfAction: string;
    // seletedFilType: string;
    // fromDate: Date;
    // toDate: Date;
    fromDateToDateForm: FormGroup;
    filterCount: number;
    allPermission: string;
    // offsetCount: number;
    // previousOffset: number;
    arrayForSortingKeys: any;
    @ViewChild('mainGridHieght') elementView: ElementRef;
    viewHeight: number;
    loaderCount = 0;
    arrayOfFileTypes: string[] = ['audio', 'image', 'video', 'document', 'text', 'archive', 'open_files'];
    public isFullListDisplayed = false;
    private noOfItemsToShowInitially = 5;
    // itemsToLoad - number of new items to be displayed
    private itemsToLoad = 5;
    // List that is going to be actually displayed to user
    public itemsToShow = this.utilsService.allAssets.slice(0, this.noOfItemsToShowInitially);
    // No need to call onScroll if full list has already been displayed

    constructor(
        public utilsService: UtilsService,
        public domSanitizer: DomSanitizer,
        public headerService: HeaderService,
        public route: ActivatedRoute,
        public datepipe: DatePipe,
        public http: HttpClient,
        public formBuilder: FormBuilder,
        public sanitizer: DomSanitizer
    ) {
        // this.flagForHideShowBackButton = false;
        this.value = false;
        this.flagForHideShowListView = false;
        this.flagForAccessType = false;
        // this.order = 'created_at';
        this.orderByForGridView = 'created_at';
        this.orderByForListView = 'created_at';
        localStorage.setItem('orderBy', JSON.stringify(this.orderByForGridView));
        this.reverseFlagForGridView = true;
        this.reverseFlagForListView = true;
        localStorage.setItem('sortBy', JSON.stringify(this.reverseFlagForGridView));
        // this.reverseFlag = false;
        this.caseInsensitive = true;
        this.filterCount = 0;
        this.utilsService.offsetCount = 0;
        this.utilsService.previousOffset = 0;
        this.utilsService.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
        this.utilsService.arrayOfSelectedAssets = new Array<number>();
    }

    removeAndSearchAgain(index) {
        if (this.utilsService.arrayOfSearchedTags.length > 1) {
            this.utilsService.arrayOfSearchedTags.splice(index, 1);
            localStorage.removeItem('search-param');
            localStorage.setItem('search-tags-param', JSON.stringify(this.utilsService.arrayOfSearchedTags));
            this.utilsService.searchAssets(null, this.utilsService.arrayOfSearchedTags);
        } else {
            this.utilsService.allAssets = new Array<Assets>();
            this.utilsService.arrayOfSearchedTags = [];
            this.utilsService.scroll = 0;
            localStorage.removeItem('search-param');
            localStorage.removeItem('search-tags-param');
            this.utilsService.redirectTo('/admin/work_area/assets/all-assets');
        }
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.fromDateToDateForm.controls[controlName].hasError(errorName);
    }

    applyCollectionValidations() {
        this.shareForm = this.formBuilder.group({
            'shareName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
            'expiry': [''],
            'downloadAllowed': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
            'sharelink': [''],
            'alloweDownloadCheckBox': ['']
        });
        // this.shareForm.controls['sharelink'].disable();
    }

    comparator(valueA, valueB) {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    }

    clickMe() {
        // this.viewHeight = this.elementView.nativeElement.offsetHeight;
        const test1 = document.getElementById('test').scrollHeight;
        if (!this.utilsService.isNullUndefinedOrBlank(test1)) {
            this.utilsService.scroll = test1;
        }
    }

    selectAllAssets() {
        if (this.value === true) {
            this.utilsService.arrayOfSelectedAssets = new Array<number>();
        }
        const obj = this.utilsService.allAssets.filter((val, index) => {
            if (this.value === true) {
                val['isSelected'] = true;
                this.utilsService.arrayOfSelectedAssets.push(val.id);
            } else {
                val['isSelected'] = false;
                this.utilsService.arrayOfSelectedAssets.splice(index, 1);
            }
        });
        if (this.value === false) {
            this.utilsService.arrayOfSelectedAssets = new Array<number>();
        }
    }

    selectUnselectAsset(assetId: number, index, value) {
        const assetIndex = this.utilsService.allAssets.findIndex(val => val.id === assetId);
        if (value === true) {
            this.utilsService.arrayOfSelectedAssets.push(assetId);
            if (this.checkIfAllSelected() === true) {
                this.value = true;
            } else {
                this.value = false;
            }
        } else if (value === false) {
            const assetIndex1 = this.utilsService.arrayOfSelectedAssets.findIndex(val => val === assetId);
            this.utilsService.arrayOfSelectedAssets.splice(assetIndex1, 1);
            if (this.checkIfAllSelected() === true) {
                this.value = true;
            } else {
                this.value = false;
            }
        }
    }

    checkIfAllSelected() {
        let flag = true;
        this.utilsService.allAssets.filter((val, index) => {
            if (val['isSelected'] === false) {
                flag = false;
                return;
            }
        });
        return flag;
    }

    openDeleteAllAssets() {
        console.log('in delete asset');

        this.assetIdForDelete = undefined;
        this.utilsService.openModal('deleteAllAssetModal');
    }

    applyValidation() {
        this.fromDateToDateForm = this.formBuilder.group({
            fromDate: [''],
            toDate: ['']
        }, { validator: this.checkDates });
    }

    checkDates(group: FormGroup) {
        if (group.controls.toDate.value && group.controls.fromDate.value) {
            if (group.controls.toDate.value < group.controls.fromDate.value) {
                group.controls['toDate'].setErrors({ notValid: true });
                group.controls['fromDate'].setErrors({ notValid: true });
                return;
            }
            group.controls['toDate'].setErrors(null);
            group.controls['fromDate'].setErrors(null);
            return;
        } else if (group.controls.toDate.value && !group.controls.fromDate.value) {
            group.controls['fromDate'].setErrors({ requiredTrue: true });
            group.controls['fromDate'].markAsTouched();
            return;
        }
    }

    accessFolderAndUploadFile(event, object: Assets, type: string) {
        // this.openFolder(object);
        this.utilsService.dropped(event, type, this.utilsService.keyForFolderName + '/', object);
    }

    sortBy(key) {
        // console.log(key);
        this.orderByForGridView = key;
        this.orderByForListView = key;
        localStorage.setItem('orderBy', JSON.stringify(this.orderByForGridView));
        this.utilsService.offsetCount = 0;
        this.utilsService.previousOffset = 0;
        this.utilsService.scroll = 0;
        this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
        this.utilsService.arrayOfSelectedAssets = new Array<number>();
        this.utilsService.offsetCount += 50;
        setTimeout(() => {
            if (this.utilsService.allAssets.length > 4) {
                this.clickMe();
            } else {
                this.utilsService.scroll = 600;
            }
        }, 2000);
        // this.reverseFlag = false;
        // this.utilsService.allAssets.sort((a, b) => a[key].localeCompare(b[key]));
    }

    orderByASCDESC(key) {
        if (key === 'ASC') {
            this.reverseFlagForGridView = false;
            this.reverseFlagForListView = false;
            localStorage.setItem('sortBy', JSON.stringify(this.reverseFlagForGridView));
            this.utilsService.offsetCount = 0;
            this.utilsService.previousOffset = 0;
            this.utilsService.scroll = 0;
            this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
            this.utilsService.arrayOfSelectedAssets = new Array<number>();
            this.utilsService.offsetCount += 50;
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }
            }, 2000);
        } else {
            this.reverseFlagForGridView = true;
            this.reverseFlagForListView = true;
            localStorage.setItem('sortBy', JSON.stringify(this.reverseFlagForGridView));
            this.utilsService.offsetCount = 0;
            this.utilsService.previousOffset = 0;
            this.utilsService.scroll = 0;
            this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, 0, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
            this.utilsService.arrayOfSelectedAssets = new Array<number>();
            this.utilsService.offsetCount += 50;
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }
            }, 2000);
        }
    }

    onScroll() {
        // console.log('Scrolling Works');
        // console.log(this.utilsService.offsetCount);
        // console.log(this.utilsService.previousOffset);
        if (this.utilsService.isNullUndefinedOrBlank(this.statusOfAction) && this.utilsService.offsetCount !== this.utilsService.previousOffset) {
            this.utilsService.previousOffset += 50;
            this.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, this.utilsService.offsetCount, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                }
            }, 2000);
        }
        // if (this.noOfItemsToShowInitially <= this.utilsService.allAssets.length) {
        //   // Update ending position to select more items from the array
        //   this.noOfItemsToShowInitially += this.itemsToLoad;
        //   this.itemsToShow = this.utilsService.allAssets.slice(0, this.noOfItemsToShowInitially);
        //   console.log("scrolled");
        // } else {
        //   this.isFullListDisplayed = true;
        // }
    }

    getAllAssets(idForFolder, offset, sort_key) {
        const formData = new FormData();
        formData.set('asset_id', idForFolder);
        formData.set('offset', offset);
        formData.set('sort_by', sort_key);
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.seletedFilType)) {
            formData.set('filter_type', this.utilsService.seletedFilType);
        }
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.fromDate)) {
            formData.set('filter_from_date', this.datepipe.transform(this.utilsService.fromDate, 'yyyy-MM-dd'));
        }
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.toDate)) {
            formData.set('filter_to_date', this.datepipe.transform(this.utilsService.toDate, 'yyyy-MM-dd'));
        }
        this.loaderCount++;
        // console.log('Loader Start' + this.loaderCount);
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listAssetsAPI, formData, (response, isResponseOnPage) => {
            if (!isResponseOnPage) {
                if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                    const array: Array<Assets> = Deserialize(response, Assets);
                    this.utilsService.offsetCount += 50;
                    // this.previousOffset += this.offsetCount;  this.loaderCount--;
                    const indexForRootFolder = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
                    if (idForFolder > 0) {
                        if (indexForRootFolder !== -1) {
                            array.filter(val => {
                                val.isPermission = true;
                                this.utilsService.allAssets.push(val);
                            });
                        } else {
                            array.filter(val => {
                                if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.allPermissions) && this.utilsService.allPermissions !== '/') {
                                    const folderUrl = '/' + this.utilsService.keyForFolderName + ('/' + val.name);
                                    const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                                    if (index !== -1 && val.asset_type === 'folder') {
                                        val['isFolderPermission'] = true;
                                    }
                                    val.isPermission = true;
                                } else {
                                    const folderUrl = '/' + this.utilsService.keyForFolderName + ('/' + val.name);
                                    const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                                    if (index !== -1 && val.asset_type === 'folder') {
                                        val['isFolderPermission'] = true;
                                    }
                                    val.isPermission = true;
                                }
                                this.utilsService.allAssets.push(val);
                            });
                        }
                    } else {
                        if (indexForRootFolder !== -1) {
                            array.filter(val => {
                                // if (val.file_type === 'folder') {
                                val.isPermission = true;
                                // } else {
                                //   val.isPermission = false;
                                // }
                                this.utilsService.allAssets.push(val);
                            });
                        } else {
                            array.filter(val => {
                                const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === ('/' + val.name));
                                // console.log(index);
                                val.isPermission = true;
                                // if (val.file_type === 'folder' && index !== -1) {
                                //   val.isPermission = true;
                                // } else {
                                //   val.isPermission = false;
                                // }
                                this.utilsService.allAssets.push(val);
                            });
                        }
                    }
                    // this.utilsService.allAssets = [...this.utilsService.allAssets, array];
                    this.loaderCount--;
                    // console.log('Loader Stop' + this.loaderCount);
                }
            } else {
                // this.utilsService.toasterService.error(response, '', {
                //   positionClass: 'toast-top-right',
                //   closeButton: true
                // });
                this.loaderCount--;
                // console.log('Loader Stop' + this.loaderCount);
            }
        }, false, undefined, undefined, true, true);
    }

    changeListView(type: string) {
        if (type === 'GridView') {
            this.flagForHideShowListView = false;
            localStorage.setItem('assetView', JSON.stringify(this.flagForHideShowListView));
            this.utilsService.scroll = 0;
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }
            }, 500);
        } else if (type === 'ListView') {
            this.flagForHideShowListView = true;
            localStorage.setItem('assetView', JSON.stringify(this.flagForHideShowListView));
            this.utilsService.scroll = 0;
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }
            }, 500);
        }
    }

    setFiletOnAssets(idForFolder, offset, sort_key) {
        const formData = new FormData();
        formData.set('asset_id', idForFolder);
        formData.set('offset', offset);
        formData.set('sort_by', sort_key);
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.seletedFilType)) {
            formData.set('filter_type', this.utilsService.seletedFilType);
        }
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.fromDate)) {
            formData.set('filter_from_date', this.datepipe.transform(this.utilsService.fromDate, 'yyyy-MM-dd'));
        }
        if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.toDate)) {
            formData.set('filter_to_date', this.datepipe.transform(this.utilsService.toDate, 'yyyy-MM-dd'));
        }
        // this.utilsService.allAssets = new Array<Assets>();
        this.utilsService.hideModal('filterModal');
        this.filterCount = 1;
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listAssetsAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                this.utilsService.allAssets = Deserialize(response, Assets);
                this.utilsService.arrayOfSelectedAssets = new Array<number>();
                this.utilsService.offsetCount += 50;
                const indexForRootFolder = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
                if (idForFolder > 0) {

                    if (indexForRootFolder !== -1) {
                        this.utilsService.allAssets.filter(val => {
                            val.isPermission = true;
                        });
                    } else {
                        this.utilsService.allAssets.filter(val => {
                            if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.allPermissions) && this.utilsService.allPermissions !== '/') {
                                val.isPermission = true;
                            } else {
                                val.isPermission = false;
                            }
                        });
                    }
                } else {
                    if (indexForRootFolder !== -1) {
                        this.utilsService.allAssets.filter(val => {
                            // if (val.file_type === 'folder') {
                            val.isPermission = true;
                            // } else {
                            //   val.isPermission = false;
                            // }
                        });
                    } else {
                        this.utilsService.allAssets.filter(val => {
                            const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === ('/' + val.name));
                            // console.log(index);
                            if (val.file_type === 'folder' && index !== -1) {
                                val.isPermission = true;
                            } else {
                                val.isPermission = false;
                            }
                        });
                    }
                }
            }
        });
        this.utilsService.scroll = 0;
        setTimeout(() => {
            if (this.utilsService.allAssets.length > 4) {
                this.clickMe();
            } else {
                this.utilsService.scroll = 600;
            }
        }, 2000);
    }

    changeAccessType(value) {
        // this.flagForAccessType = !this.flagForAccessType;
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;
        }
    }

    // getAllAssets(idForFolder) {
    //   const formData = new FormData();
    //   formData.set('asset_id', idForFolder);
    //   this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listAssetsAPI, formData, (response) => {
    //     if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
    //       this.allAssets = Deserialize(response, Assets);
    //     }
    //   });
    // }

    getAllCollections() {
        // const formData = new FormData();
        // this.userId = this.utilsService.getLoginUsers().id;
        // formData.set('user_id', this.userId);
        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listCollectionsAPI, param, (response) => {
            // console.log(response);
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

    gotoAllAssets() {
        this.utilsService.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
        this.BackToAllAssets();
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

    openShareModal(assetObj: Assets) {
        this.assetsIdForCreateShare = assetObj.id;
        this.shareLink = undefined;
        this.shareObj.allow_downloads = 999999;
        this.flagForAccessType = false;
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
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;

        }
        // console.log(this.shareObj);


        const obj = Serialize(this.shareObj, Share);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.set(key, obj[key]);
            }
        }

        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.createShareAPI, formData, (response) => {
            this.errorArray = new Array<string>();
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                // if (!isResponseOnPage) {
                // console.log(response);

                this.shareObj = Deserialize(response, Share);
                // console.log(this.shareObj);

                this.shareLink = UtilsService.FRONT_URL + 'share/sharedAssets/' + this.shareObj.link_token;
                // console.log(this.shareLink);

                // } else {
                //   this.errorArray.push(response);
                // }
            }
        });
    }

    // openFolder(obj: Assets) {

    //   if (obj.asset_type === 'folder') {

    //     this.getAllAssets(obj.id);
    //     this.flagForHideShowBackButton = true;
    //     if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.keyForFolderName)) {
    //       this.utilsService.keyForFolderName += obj.name;
    //     } else {

    //       this.utilsService.keyForFolderName = obj.name;
    //     }
    //   }
    //   console.log(this.utilsService.keyForFolderName);


    // }
    resetShareModal() {
        this.shareObj = new Share();
        this.applyCollectionValidations();
    }

    // redirectToAssetsDetails(idOfAssets, filetype, obj: Assets) {
    //   if (filetype === 'folder') {

    //     this.getAllAssets(idOfAssets);
    //     this.flagForHideShowBackButton = true;
    //     if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.keyForFolderName)) {
    //       this.utilsService.keyForFolderName += obj.name;
    //     } else {

    //       this.utilsService.keyForFolderName = obj.name;
    //     }
    //   } else {
    //     this.utilsService.redirectTo('/admin/work_area/assets/assets-details/' + idOfAssets);

    //   }
    // }

    refreshAssets() {
        this.utilsService.offsetCount = 0;
        // console.log(this.utilsService.assetIdForGetFolderAssetsOnDelete);
        // console.log(this.statusOfAction);
        // console.log(this.utilsService.mainSearchNgModel);
        // console.log(this.utilsService.searchNgModel);
        this.utilsService.arrayOfSelectedAssets = new Array<number>();
        if (!this.utilsService.isNullUndefinedOrBlank(this.statusOfAction)) {
            if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.assetIdForGetFolderAssetsOnDelete) && this.utilsService.assetIdForGetFolderAssetsOnDelete > 0) {
                this.utilsService.scroll = 0;
                this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
                console.log(' this.utilsService.assetIdForGetFolderAssetsOnDelete=> ', this.utilsService.assetIdForGetFolderAssetsOnDelete);
                setTimeout(() => {
                    if (this.utilsService.allAssets.length > 4) {
                        this.clickMe();
                    } else {
                        this.utilsService.scroll = 600;
                    }
                }, 2000);
                this.utilsService.offsetCount += 50;
            } else {
                if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.mainSearchNgModel)) {
                    const searchparams = localStorage.getItem('search-param');
                    this.utilsService.mainSearchNgModel = searchparams;
                    // console.log(searchparams);
                    this.utilsService.searchAssets(searchparams, null);
                } else if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.searchNgModel)) {
                    const searchTagsparams = JSON.parse(localStorage.getItem('search-tags-param'));
                    this.utilsService.searchNgModel = searchTagsparams;
                    this.utilsService.searchAssets(null, searchTagsparams);
                }
            }
        } else {
            this.utilsService.scroll = 0;
            this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }
            }, 2000);
            this.utilsService.offsetCount += 50;
        }
        // }
    }

    BackToAllAssets() {
        this.utilsService.flagForHideShowBackButton = false;
        this.utilsService.keyForFolderName = undefined;
        this.utilsService.isBreadCrumb = false;
        this.utilsService.assetIdForGetFolderAssetsOnDelete = undefined;
        this.utilsService.offsetCount = 0;
        this.utilsService.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
        this.utilsService.arrayOfSelectedAssets = new Array<number>();
        localStorage.removeItem('permission');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        const index = this.utilsService.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
        if (index !== -1) {
            this.utilsService.allPermissions = '/';
            localStorage.setItem('permission', this.utilsService.allPermissions);
        } else {
            this.utilsService.allPermissions = undefined;
        }

        // console.log(this.statusOfAction);
        // console.log(this.utilsService.mainSearchNgModel);
        // console.log(this.utilsService.searchNgModel);


        if (!this.utilsService.isNullUndefinedOrBlank(this.statusOfAction)) {

            if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.mainSearchNgModel) || !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-param'))) {
                const searchparams = localStorage.getItem('search-param');
                this.utilsService.mainSearchNgModel = searchparams;
                this.utilsService.flagForHideShowAssestLabel = true;
                // console.log(searchparams);
                this.utilsService.searchAssets(searchparams, null);
            } else if (!this.utilsService.isEmptyObjectOrNullUndefiend(this.utilsService.searchNgModel) || !this.utilsService.isNullUndefinedOrBlank(localStorage.getItem('search-tags-param'))) {
                const searchTagsparams = JSON.parse(localStorage.getItem('search-tags-param'));
                this.utilsService.flagForHideShowAssestLabel = true;
                this.utilsService.searchNgModel = searchTagsparams;
                this.utilsService.searchAssets(null, searchTagsparams);
            }
        } else {
            // console.log('calledddd');
            this.utilsService.offsetCount = 0;
            this.utilsService.previousOffset = 0;
            this.utilsService.assetIdForGetFolderAssetsOnDelete = undefined;
            this.utilsService.scroll = 0;
            this.utilsService.getAllAssets(0, this.utilsService.offsetCount, (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
            setTimeout(() => {
                if (this.utilsService.allAssets.length > 4) {

                    this.clickMe();
                } else {
                    this.utilsService.scroll = 600;
                }

            }, 2000);
            this.utilsService.offsetCount += 50;
        }

    }
    getFileExtension(fileName) {
        const splifileName = fileName.split('.');
        const splitArrayLength = splifileName.length - 1;
        const extension = splifileName[splitArrayLength];
        return extension;

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
                // console.log(filtered);
                filtered.splice(index + 1);
                this.utilsService.keyForFolderName = filtered.join('/');
                // const indexOfFolder = filtered.findIndex(val => val === folderName.replace(/\//g, ''));
                const index1 = this.utilsService.arrayOfPermissionForAssets.findIndex(val => val.name === '/' + this.utilsService.keyForFolderName);
                if (this.utilsService.allPermissions !== '/' && index1 !== -1) {
                    this.utilsService.allPermissions = '/' + this.utilsService.keyForFolderName;
                    localStorage.setItem('permission', this.utilsService.allPermissions);
                }
                localStorage.setItem('breadCrumbs', JSON.stringify(this.utilsService.arrayOfBreadCrumb));
                localStorage.setItem('folderKey', JSON.stringify(this.utilsService.keyForFolderName));
                this.utilsService.assetIdForGetFolderAssetsOnDelete = idOfAsset;
                this.utilsService.getAllAssets(idOfAsset, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
                this.utilsService.arrayOfSelectedAssets = new Array<number>();
            }
        }
    }

    download(docId, docName, asseType) {
        console.log('Download', docId);
        console.log('docName', docName);
        console.log('asseType', asseType);
        const headers = new HttpHeaders()
            .append('ChannelID', 'WEB')
            .append('ReqID', '789654')
            .append('RequestDate', Date.parse(new Date().toString()).toString())
            .append('XkurateKey', 'KEY-WEB-#1014')
            .append('ApiToken', this.utilsService.getToken());
        const formData = new FormData();
        formData.set('asset_id', docId);
        this.utilsService.loaderStart++;
        this.http.post(UtilsService.URL + this.utilsService.serverVariableService.downloadIndividualAssetAPI, formData, {
            headers: headers,
            reportProgress: true
        }).subscribe((res: any) => {
            if (res['response'] === 0) {
                console.log('res => ', res);
                this.utilsService.loaderStart--;
                this.utilsService.toasterService.error(res['message'], '', {
                    positionClass: 'toast-top-right',
                    closeButton: true
                });
            } else {
                console.log('in foldeer in else');
                if (asseType === 'folder') {
                    docName += '.zip';
                    console.log('in folder');
                    // this.utilsService.download(res['download_url'], docName).subscribe();
                    // } else if (asseType === 'file') {
                }
                this.utilsService.download(res['download_url'], docName).subscribe();
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

    // textFileDownload() {
    //     this.httpClient.get('url', { responseType: 'arraybuffer' })
    //         .subscribe((res) => {
    //             this.writeContents(res, 'test.txt', 'text/txt'); // file extension
    //         });
    // }

    // writeContents(content, fileName, contentType) {
    //     const a = document.createElement('a');
    //     const file = new Blob([content], { type: contentType });
    //     a.href = URL.createObjectURL(file);
    //     a.download = fileName;
    //     a.click();
    // }
    openDeleteAssetModal(id) {
        this.assetIdForDelete = id;
        this.utilsService.openModal('deleteAssetModal');
    }

    deleteAssetById(assetId, modalId: string) {
        console.log('in delete asset by id');
        const formData = new FormData();
        formData.set('asset_ids', assetId);
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteAssetAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                // console.log('Assets Deleted Successfully');
                this.utilsService.hideModal(modalId);
                this.utilsService.scroll = 0;
                this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
                this.utilsService.arrayOfSelectedAssets = new Array<number>();
                setTimeout(() => {
                    if (this.utilsService.allAssets.length > 4) {
                        this.clickMe();
                    } else {
                        this.utilsService.scroll = 600;
                    }
                }, 2000);
            }
        }, true);
    }

    deleteAllAssetById(assetId, modalId: string) {
        console.log('in delete all');
        const index2 = this.utilsService.arrayOfPermissionForAssets.findIndex(val => val.name === '/');
        if (index2 !== -1) {
            if (this.utilsService.arrayOfPermissionForAssets[index2].isDelete === true) {
                const formData = new FormData();
                formData.set('asset_ids', assetId);
                this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteAssetAPI, formData, (response) => {
                    if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                        // console.log('Assets Deleted Successfully');
                        this.utilsService.hideModal(modalId);
                        this.utilsService.scroll = 0;
                        this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
                        this.utilsService.arrayOfSelectedAssets = new Array<number>();
                        setTimeout(() => {
                            if (this.utilsService.allAssets.length > 4) {
                                this.clickMe();
                            } else {
                                this.utilsService.scroll = 600;
                            }
                        }, 2000);
                    }
                }, true);
            } else {
                this.utilsService.toasterService.error(this.utilsService.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                    positionClass: 'toast-top-right',
                    closeButton: true
                });
            }
        } else if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.allPermissions)) {
            const index1 = this.utilsService.arrayOfPermissionForAssets.findIndex(val => val.name === this.utilsService.allPermissions);
            if (this.utilsService.arrayOfPermissionForAssets[index1].isDelete === true) {
                const formData = new FormData();
                formData.set('asset_ids', assetId);
                this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteAssetAPI, formData, (response) => {
                    if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                        // console.log('Assets Deleted Successfully');
                        this.utilsService.hideModal(modalId);
                        this.utilsService.scroll = 0;
                        this.utilsService.getAllAssets(this.utilsService.assetIdForGetFolderAssetsOnDelete ? this.utilsService.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.desc' : '.asc')));
                        this.utilsService.arrayOfSelectedAssets = new Array<number>();
                        setTimeout(() => {
                            if (this.utilsService.allAssets.length > 4) {
                                this.clickMe();
                            } else {
                                this.utilsService.scroll = 600;
                            }
                        }, 2000);
                    }
                }, true);
            } else {
                this.utilsService.toasterService.error(this.utilsService.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                    positionClass: 'toast-top-right',
                    closeButton: true
                });
            }
        } else {
            this.utilsService.toasterService.error(this.utilsService.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                positionClass: 'toast-top-right',
                closeButton: true
            });
        }
    }

    cancelFilter() {
        this.utilsService.hideModal('filterModal');
        this.filterCount = 0;
        this.utilsService.seletedFilType = undefined;
        this.utilsService.fromDate = undefined;
        this.utilsService.toDate = undefined;
        this.applyValidation();
    }

    addOrRemoveCollection(isSelected, obj: Collection) {

        if (isSelected === true) {
            this.selectedCollectionsIds.push(obj.id);
        } else if (isSelected === false) {
            const index = this.selectedCollectionsIds.findIndex(val => val === obj.id);
            this.selectedCollectionsIds.splice(index, 1);
        }
    }
}
