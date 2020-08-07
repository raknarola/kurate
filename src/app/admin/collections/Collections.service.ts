import { ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import * as moment from 'moment';
import { UtilsService } from '../../services/utils.service';
import { Collection } from '../../models/Collection';
import { FormGroup } from '@angular/forms';
import { Deserialize, Serialize } from 'cerialize';
import { ButtonRendererComponent } from '../buttonRender/button-renderer.component';
import { CheckboxRenderComponent } from '../checkboxRender/checkboxRender.component';
import {
    ShareCollectionButtonRendererComponent
} from '../buttonRender/share-collection-button-renderer.component';
import { Share } from '../../models/Share';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Assets } from '../../models/Assets';

@Injectable({
    providedIn: 'root'
})

export class CollectionsService {

    collectionForm: FormGroup;
    allCollections: Array<Collection> = new Array<Collection>();
    otherCollections: Array<Collection> = new Array<Collection>();
    statusForCollectionModal: string;
    collectionIdForDelete: number;
    collectionObj = new Collection();
    // ag-grid Variables
    public gridApi;
    public gridColumnApi;
    public rowSelection; // for multiple checkbox
    public sortingOrder;
    frameworkComponents: any;
    itemsPerPage: number;
    userId: any;

    public isFullWidthCell;
    fullWidthCellRenderer: string;
    arrayOfCollection = [
        {
            'id': 1,
            'name': 'MyCollection',
            'user_id': 4,
            'background_color': '#8681b8',
            'created_at': '2020-02-21 06:07:17',
            'updated_at': '2020-02-27 07:24:50'
        },
        {
            'id': 2,
            'name': 'MyCollection',
            'user_id': 4,
            'background_color': '#8681b8',
            'created_at': '2020-02-24 05:45:47',
            'updated_at': '2020-02-24 05:45:47'
        },
        {
            'id': 3,
            'name': 'MyCollection1',
            'user_id': 4,
            'background_color': '#8681b8',
            'created_at': '2020-02-24 05:46:13',
            'updated_at': '2020-02-24 05:46:13'
        },
        {
            'id': 4,
            'name': 'MyCollection3',
            'user_id': 4,
            'background_color': '#14566',
            'created_at': '2020-02-27 07:22:28',
            'updated_at': '2020-02-27 07:22:28'
        },
        {
            'id': 5,
            'name': 'MyCollection4',
            'user_id': 4,
            'background_color': '#1456678',
            'created_at': '2020-02-27 07:22:39',
            'updated_at': '2020-02-27 07:22:39'
        },
        {
            'id': 6,
            'name': 'MyCollection5',
            'user_id': 4,
            'background_color': '#145667889',
            'created_at': '2020-02-27 07:22:46',
            'updated_at': '2020-02-27 07:22:46'
        },
        {
            'id': 7,
            'name': 'MyCollection6',
            'user_id': 4,
            'background_color': '#5647889',
            'created_at': '2020-02-27 07:23:07',
            'updated_at': '2020-02-27 07:23:07'
        }
    ];
    errorArray: Array<string>;
    color = '#ffffffff';
    flagForHideShowCollection: boolean;

    shareForm: FormGroup;
    shareObj = new Share();
    expiryDate: string;
    todayDate = new Date();
    flagForAccessType: boolean;
    shareLink: string;
    collectionIdForCreateShare: number;
    collectionAssets: Array<Assets> = new Array<Assets>();

    @ViewChild('agGrid') agGrid: AgGridNg2;
    @ViewChild('agGrid2') agGrid2: AgGridNg2;

    columnDefsForCollections = [
        {
            headerName: 'Id',
            field: 'id',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Name',
            field: 'name',
            width: 40,
            minWidth: 40,
            comparator: (valueA, valueB) => {
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
        },
        {
            headerName: 'Color',
            field: 'background_color',
            width: 30,
            minWidth: 30,
            cellStyle: function (params) {
                return { 'background-color': params.value };
            }
        },
        {
            headerName: 'Date Added',
            field: 'created_at',
            type: ['dateColumn'],
            width: 30,
            minWidth: 30,
            cellRenderer: (data) => {
                // console.log(data.value);

                const date = new Date(data.value);
                // console.log(date);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return formatted_date;
            }
        },
        {
            headerName: 'Date Updated',
            field: 'updated_at',
            type: ['dateColumn'],
            width: 30,
            minWidth: 30,
            cellRenderer: (data) => {
                const date = new Date(data.value);
                // console.log(date);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return formatted_date;
            }
        },
        {
            headerName: 'Action',
            field: 'edit_delete_icon',
            cellRenderer: 'shareButtonRenderer',
            width: 25,
            minWidth: 25,
            cellRendererParams: {
                onClick: this.openEditOrDeleteCollection.bind(this)
            }
        },

    ];
    columnDefsForOtherCollections = [
        {
            headerName: 'Id',
            field: 'id',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Name',
            field: 'name',
            width: 40,
            minWidth: 40,
            comparator: (valueA, valueB) => {
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
        },
        {
            headerName: 'Color',
            field: 'background_color',
            width: 30,
            minWidth: 30,
            cellStyle: function (params) {
                return { 'background-color': params.value };
            }
        },
        {
            headerName: 'Date Added',
            field: 'created_at',
            type: ['dateColumn'],
            width: 30,
            minWidth: 30,
            cellRenderer: (data) => {
                return moment(data.value).format('d MMM YYYY');
            }
        },
        {
            headerName: 'Date Updated',
            field: 'updated_at',
            type: ['dateColumn'],
            width: 30,
            minWidth: 30,
            cellRenderer: (data) => {
                return moment(data.value).format('d MMM YYYY');
            }
        },
        {
            headerName: 'Action',
            field: 'edit_delete_share_icon',
            cellRenderer: 'buttonRenderer',
            width: 25,
            minWidth: 25,
            cellRendererParams: {
                onClick: this.openEditOrDeleteCollection.bind(this)
            }
        },
    ];

    constructor(
        public utilsService: UtilsService,
        public datepipe: DatePipe,
        public formBuilder: FormBuilder
    ) {
        this.flagForHideShowCollection = false;
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
            shareButtonRenderer: ShareCollectionButtonRendererComponent,
            checkboxRenderer: CheckboxRenderComponent
        };
        localStorage.removeItem('isSearched');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        localStorage.removeItem('search-param');
        localStorage.removeItem('search-tags-param');
        localStorage.removeItem('assetView');
        localStorage.removeItem('orderBy');
        localStorage.removeItem('sortBy');
        this.utilsService.flagForHideShowSearchInput = false;
    }

    applyShareValidations() {
        this.shareForm = this.formBuilder.group({
            'shareName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_COMMA)])],
            'expiry': [''],
            'downloadAllowed': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
            'sharelink': [''],
            'alloweDownloadCheckBox': ['']
        });
        // this.shareForm.controls['sharelink'].disable();
    }

    /**
    * @returns grid value on load of page
    */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.rowSelection = 'multiple';

    }

    applyCollectionValidations() {
        this.collectionForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_COMMA)])],
            'color': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHANUMERIC_DIGIT_SPECIAL_ESCAPE_CHARS)])],
        });
    }

    openEditOrDeleteCollection(event) {
        if (event.value === 'Edit') {
            this.openCollectionModal(event, undefined);
        } else if (event.value === 'Delete') {
            this.openDeleteCollectionModal(event);
        } else if (event.value === 'Share') {
            this.openShareModal(event);
        } else if (event.value === 'View') {
            this.openViewCollectionsAssetsModal(event);
        }
    }

    openViewCollectionsAssetsModal(event) {
        console.log('event => ', event);
        this.getAllAssetsOfCollection(event.rowData.id);
        this.utilsService.openModal('assetListModal');
    }

    getAllAssetsOfCollection(colId) {
        const formData = new FormData();
        // console.log(colId);
        formData.set('id', colId);
        this.collectionAssets = new Array<Assets>();
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listCollectionAssetsAPI, formData, (response, isResponseOnPage) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                if (!isResponseOnPage) {
                    this.collectionAssets = Deserialize(response, Assets);
                }
            }
        }, false, undefined, undefined, false, true);
    }

    openCollectionModal(event, status) {
        this.statusForCollectionModal = status ? status : event.value;
        this.collectionObj = new Collection();
        this.errorArray = new Array<string>();
        if (this.statusForCollectionModal === 'Add') {
            this.collectionObj.background_color = this.color;
        } else if (this.statusForCollectionModal === 'Edit') {
            this.collectionObj = Deserialize(event.rowData, Collection);
        }
        this.utilsService.openModal('addCollectionModal');
        // console.log(this.collectionObj);
    }

    openDeleteCollectionModal(event) {
        this.collectionIdForDelete = event.rowData.id;
        this.utilsService.openModal('deleteCollectionModal');
    }

    getAllCollections() {
        // const formData = new FormData();
        // this.userId = this.utilsService.getLoginUsers().id;
        // formData.set('user_id', this.userId);
        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listCollectionsAPI, param, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.allCollections = Deserialize(response['my_collection'], Collection);
                this.otherCollections = Deserialize(response['other_collection'], Collection);
                // this.gridApi.refreshCells();
                this.agGrid.api.sizeColumnsToFit();
                this.agGrid2.api.sizeColumnsToFit();
            }
        });
    }

    deleteCollectionById(collectionId) {
        const formData = new FormData();
        formData.set('collection_id', collectionId);
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteCollectionAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                console.log('Collection Deleted Successfully');
                this.utilsService.hideModal('deleteCollectionModal');
                this.getAllCollections();
            }
        }, true);
    }

    saveOrUpdateCollection(status) {
        const formData = new FormData();
        // if (status === 'Edit') {
        //   this.collectionObj.collection_id = this.collectionObj.id;
        //   this.collectionObj.id = undefined;
        // }
        const obj = Serialize(this.collectionObj, Collection);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.set(key, obj[key]);
            }
        }
        if (status === 'Add') {
            this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.manageCollectionAPI, formData, (response, isResponseOnPage) => {
                this.errorArray = [];
                // console.log(response);
                if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                    if (!isResponseOnPage) {
                        this.utilsService.hideModal('addCollectionModal');
                        this.getAllCollections();
                        this.resetCollectionsModal();
                    } else {
                        // for (const key in response) {
                        //   if (response.hasOwnProperty(key)) {
                        this.errorArray.push(response);
                        //   }
                        // }
                        // this.errorArray.push(response);
                    }
                }
            }, true);
        } else if (status === 'Edit') {
            this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.updateCollectionsAPI, formData, (response, isResponseOnPage) => {
                this.errorArray = [];
                // console.log(response);
                if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                    if (!isResponseOnPage) {
                        this.utilsService.hideModal('addCollectionModal');
                        this.getAllCollections();
                        this.resetCollectionsModal();
                    } else {
                        // for (const key in response) {
                        //   if (response.hasOwnProperty(key)) {
                        this.errorArray.push(response);
                        //   }
                        // }
                        // this.errorArray.push(response);
                    }
                }
            }, true);
        }
    }

    changeTab() {
        if (this.flagForHideShowCollection === false) {
            this.agGrid2.api.sizeColumnsToFit();
        }
        this.flagForHideShowCollection = !this.flagForHideShowCollection;
    }

    resetCollectionsModal() {
        this.collectionObj = new Collection();
        this.errorArray = [];
        this.applyCollectionValidations();
    }

    changeAccessType(value) {
        // this.flagForAccessType = !this.flagForAccessType;
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;
        }
    }

    openShareModal(event) {
        const collectionObj = Deserialize(event.rowData, Collection);
        this.collectionIdForCreateShare = collectionObj.id;
        this.shareObj.name = collectionObj.name;
        this.shareObj.allow_downloads = 999999;
        this.flagForAccessType = false;
        this.shareLink = undefined;
        this.errorArray = [];
        this.utilsService.openModal('shareCollectionModal');
    }

    createShare(assetId) {
        const formData = new FormData();
        this.shareObj.asset_id = assetId;
        this.shareObj.share_type = 1;
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
        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.createShareAPI, formData, (response, isResponseOnPage) => {
            this.errorArray = [];
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                // if (!isResponseOnPage) {
                // console.log(response);
                this.shareObj = Deserialize(response, Share);
                this.shareLink = UtilsService.FRONT_URL + 'share/sharedAssets/' + this.shareObj.link_token;
                // } else {
                //   console.log(response);
                //   this.errorArray.push(response);
                // }
            }
        });
    }

    resetShareModal() {
        this.shareObj = new Share();
        this.errorArray = [];
        this.applyShareValidations();
        this.shareForm.controls['shareName'].markAsUntouched();
        this.shareForm.controls['expiry'].markAsUntouched();
        this.shareForm.controls['downloadAllowed'].markAsUntouched();
    }

}
