import { ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import * as moment from 'moment';
import { Share } from '../../models/Share';
import { UtilsService } from '../../services/utils.service';
import { Deserialize, Serialize } from 'cerialize';
import {
    ShareCollectionButtonRendererComponent
} from '../buttonRender/share-collection-button-renderer.component';
import { ButtonRendererComponent } from '../buttonRender/button-renderer.component';
import {
    ShareCopyLinkButtonRendererComponent
} from '../buttonRender/share-copy-link-button-renderer.component';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OtherShareButtonRendererComponent } from '../buttonRender/other-share-button-renderer.component';

@Injectable({
    providedIn: 'root'
})
export class ShareService {


    // ag-grid Variables
    public gridApi;
    public gridColumnApi;
    public rowSelection; // for multiple checkbox
    public rowClassRules; // for row color new arrival,under business,hot pink
    public cellClassRules; // for row color new arrival,under business,hot pink


    @ViewChild('agGrid') agGrid: AgGridNg2;
    @ViewChild('agGrid2') agGrid2: AgGridNg2;

    columnDefsForShare = [
        {
            headerName: 'Id',
            field: 'id',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Share Name',
            field: 'name',
            width: 30,
            minWidth: 30,
            comparator: (valueA, valueB) => {
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
        },
        {
            headerName: 'User',
            field: 'user.firstName',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Created Date',
            field: 'created_at',
            type: ['dateColumn'],
            width: 20,
            minWidth: 20,

            cellRenderer: (data) => {
                const date = new Date(data.value);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return formatted_date;
            }
        },
        {
            headerName: 'Expiry Date',
            field: 'expire_date',
            type: ['dateColumn'],
            width: 25,
            minWidth: 25,
            cellRenderer: (data) => {
                const date = new Date(data.value);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return data.value ? formatted_date : '';
            }
        },
        {
            headerName: 'Is Expired',
            field: 'is_expire',
            width: 20,
            minWidth: 20
        },
        {
            headerName: 'Action',
            field: 'edit_delete_icon',
            cellRenderer: 'shareCopyLinkButtonRenderer',
            width: 20,
            minWidth: 20,
            cellRendererParams: {
                onClick: this.openShareEditOrDeleteorShare.bind(this)
            }
        }
    ];

    columnDefsForOtherShare = [
        {
            headerName: 'Id',
            field: 'id',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Share Name',
            field: 'name',
            width: 30,
            minWidth: 30,
            comparator: (valueA, valueB) => {
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
        },
        {
            headerName: 'User',
            field: 'user.firstName',
            width: 20,
            minWidth: 20,
        },
        {
            headerName: 'Created Date',
            field: 'created_at',
            type: ['dateColumn'],
            width: 20,
            minWidth: 20,
            cellRenderer: (data) => {
                const date = new Date(data.value);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return formatted_date;
            }
        },
        {
            headerName: 'Expiry Date',
            field: 'expire_date',
            type: ['dateColumn'],
            width: 25,
            minWidth: 25,
            cellRenderer: (data) => {
                const date = new Date(data.value);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return data.value ? formatted_date : '';
            }
        },
        {
            headerName: 'Is Expire',
            field: 'is_expire',
            width: 20,
            minWidth: 20
        },
        {
            headerName: 'Action',
            field: 'edit_delete_icon',
            cellRenderer: 'otherShareButtonRenderer',
            width: 20,
            minWidth: 20,
            cellRendererParams: {
                onClick: this.openShareEditOrDeleteorShare.bind(this)
            }
        }
    ];

    public sortingOrder;
    itemsPerPage: number;

    frameworkComponents: any;

    public innerWidth: any;
    public isFullWidthCell;
    public fullWidthCellRenderer;

    flagForHideShowShare: boolean;

    myShare: Array<Share> = new Array<Share>();
    otherShare: Array<Share> = new Array<Share>();
    shareObj = new Share();
    expiryDate: string;
    todayDate = new Date();
    errorArray = new Array<string>();
    shareIdForDelete: number;
    shareForm: FormGroup;
    shareLink: string;
    flagForAccessType: boolean;

    constructor(
        public utilsService: UtilsService,
        public formBuilder: FormBuilder,
        public datepipe: DatePipe
    ) {
        this.sortingOrder = ['asc', 'desc'];
        this.itemsPerPage = 10;
        this.flagForAccessType = false;
        this.flagForHideShowShare = false;
        this.isFullWidthCell = function (rowNode) {
            return rowNode.data.fullWidth;
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
        this.fullWidthCellRenderer = 'fullWidthCellRenderer';
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
            shareCopyLinkButtonRenderer: ShareCopyLinkButtonRendererComponent,
            otherShareButtonRenderer: OtherShareButtonRendererComponent
        };
    }

    /**
  * @returns grid value on load of page
  */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.rowSelection = 'multiple';

    }
    applyShareValidations() {
        this.shareForm = this.formBuilder.group({
            'shareName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
            'expiry': [''],
            'downloadAllowed': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_NUMBER)])],
            'sharelink': [''],
            'alloweDownloadCheckBox': ['']
        });
        // this.shareForm.controls['sharelink'].disable();
    }

    getAllShares() {

        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listSharesAPI, param, (response) => {
            // console.log(response);

            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.myShare = Deserialize(response['my_share'], Share);
                this.otherShare = Deserialize(response['others_share'], Share);
                const obj = this.myShare.filter(val => {
                    if (val.is_expire === 1) {
                        val.is_expire = 'Yes';
                    } else if (val.is_expire === 0) {
                        val.is_expire = 'No';
                    }
                });

                const obj1 = this.otherShare.filter(val => {
                    if (val.is_expire === 1) {
                        val.is_expire = 'Yes';
                    } else if (val.is_expire === 0) {
                        val.is_expire = 'No';
                    }
                });
                this.agGrid.api.sizeColumnsToFit();
                this.agGrid2.api.sizeColumnsToFit();
            }
        });
    }

    changeTab(type: string) {
        if (this.flagForHideShowShare === false) {
            this.agGrid2.api.sizeColumnsToFit();
        }
        if (type === 'MyShare') {
            this.flagForHideShowShare = false;
        } else if (type === 'OtherShare') {
            this.flagForHideShowShare = true;
        }
    }

    openShareEditOrDeleteorShare(event) {
        if (event.value === 'Edit') {
            this.openShareModal(event, undefined);
        } else if (event.value === 'Delete') {
            this.openDeleteShareModal(event);
        } else if (event.value === 'CopyShareLink') {
            this.copylink(event);
        } else if (event.value === 'View') {
            this.openUrlInNewTab(event);
        }
    }

    openUrlInNewTab(event) {
        console.log('event => ', event);

        const obj = Deserialize(event.rowData, Share);
        console.log('obj => ', obj);

        window.open(UtilsService.FRONT_URL + 'share/sharedAssets/' + obj.link_token);
    }

    copylink(event) {
        const obj = Deserialize(event.rowData, Share);
        this.utilsService.copyText(UtilsService.FRONT_URL + 'share/sharedAssets/' + obj.link_token);
    }

    openShareModal(event, status) {

        console.log(event);
        console.log('status => ', status);

        this.shareObj = new Share();
        this.errorArray = new Array<string>();
        this.shareLink = undefined;
        this.shareObj = Deserialize(event.rowData, Share);
        if (this.shareObj.access_type === 0) {
            this.flagForAccessType = false;
        } else if (this.shareObj.access_type === 1) {
            this.flagForAccessType = true;
        }
        this.shareLink = UtilsService.FRONT_URL + 'share/sharedAssets/' + this.shareObj.link_token;
        // console.log(this.shareLink);

        this.utilsService.openModal('shareCollectionModal');
    }


    openDeleteShareModal(event) {
        this.shareIdForDelete = event.rowData.id;
        this.utilsService.openModal('deleteShareModal');
    }

    changeAccessType(value) {
        // this.flagForAccessType = !this.flagForAccessType;
        if (this.flagForAccessType === false) {
            this.shareObj.access_type = 0;
        } else if (this.flagForAccessType === true) {
            this.shareObj.access_type = 1;

        }
    }

    resetShareModal() {
        this.shareObj = new Share();
        this.shareLink = undefined;
        this.applyShareValidations();
    }


    updateShare() {
        const formData = new FormData();
        const date = new Date(this.shareObj.expire_date);
        this.shareObj.share_type = 1;
        if (!this.utilsService.isNullUndefinedOrBlank(this.shareObj.expire_date)) {

            this.shareObj.expire_date = this.datepipe.transform(date, 'yyyy-MM-dd');
        } else {
            this.shareObj.expire_date = undefined;
        }

        // console.log(this.shareObj);

        const obj = Serialize(this.shareObj, Share);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.set(key, obj[key]);
            }
        }

        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.manageShareAPI, formData, (response, isResponseOnPage) => {
            this.errorArray = [];
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                if (!isResponseOnPage) {

                    this.shareObj = Deserialize(response, Share);
                    this.utilsService.hideModal('shareCollectionModal');
                    this.getAllShares();
                } else {
                    this.errorArray.push(response);
                }
            }
        }, true);
    }

    deleteShareById(shareId) {
        const formData = new FormData();
        formData.set('share_ids', shareId);

        this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteSharesAPI, formData, (response) => {
            if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
                console.log('Share Deleted Successfully');
                this.utilsService.hideModal('deleteShareModal');
                this.getAllShares();
            }
        }, true);
    }



}
