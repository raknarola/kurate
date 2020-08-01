import { Injectable, ViewChild } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../buttonRender/button-renderer.component';
import { ShareCollectionButtonRendererComponent } from '../../buttonRender/share-collection-button-renderer.component';
import { CheckboxRenderComponent } from '../../checkboxRender/checkboxRender.component';
import { AccessLog } from '../../../models/Access-Logs';
import { Deserialize } from 'cerialize';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AccessLogService {
    // ag-grid Variables
    public gridApi;
    public gridColumnApi;
    public rowSelection; // for multiple checkbox
    public sortingOrder;
    frameworkComponents: any;
    itemsPerPage: number;
    userId: any;
    allCollections = [];
    fromDate: Date;
    toDate: Date;
    allAccessLogs: Array<AccessLog> = new Array<AccessLog>();

    public isFullWidthCell;

    fullWidthCellRenderer: string;
    columnDefsForCollections = [
        {
            headerName: 'Id',
            field: 'id',
            width: 30,
            minWidth: 30
        },
        {
            headerName: 'Message',
            field: 'description',
            width: 120,
            minWidth: 120
        },
        {
            headerName: 'User Name',
            field: 'username',
            width: 40,
            minWidth: 40
        },
        {
            headerName: 'Organization',
            field: 'organization_name',
            width: 40,
            minWidth: 40
        },
        // {
        //   headerName: 'Type',
        //   field: 'background_color',
        //   width: 40,
        //   minWidth: 40
        // },
        // {
        //   headerName: 'File Object',
        //   field: 'created1_at',
        //   width: 60,
        //   minWidth: 60
        // },
        // {
        //   headerName: 'Component',
        //   field: 'updated_at',
        //   width: 60,
        //   minWidth: 60
        // },
        {
            headerName: 'Source',
            field: 'ip',
            width: 70,
            minWidth: 70
        },
        {
            headerName: 'Date',
            field: 'created_at',
            type: ['dateColumn'],
            width: 50,
            minWidth: 50,
            cellRenderer: (data) => {
                // console.log(data.value);

                const date = new Date(data.value);
                // console.log(date);
                const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
                return formatted_date;
            }
        },

        // {
        //   headerName: 'Action',
        //   field: 'edit_delete_icon',
        //   cellRenderer: 'shareButtonRenderer',
        //   width: 20,
        //   minWidth: 20,
        //   cellRendererParams: {
        //     onClick: this.openEditOrDeleteCollection.bind(this)
        //   }
        // },
    ];

    @ViewChild('agGrid') agGrid: AgGridNg2;
    @ViewChild('agGrid2') agGrid2: AgGridNg2;
    fromDateToDateForm: FormGroup;
    constructor(public utilsService: UtilsService, public datepipe: DatePipe, public http: HttpClient, public formBuilder: FormBuilder) {
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

    public hasError = (controlName: string, errorName: string) => {
        return this.fromDateToDateForm.controls[controlName].hasError(errorName);
    }
    /**
     * @returns grid value on load of page
     */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.rowSelection = 'multiple';
        this.utilsService.loaderStart++;
        setTimeout(() => {

            this.agGrid.api.sizeColumnsToFit();
            this.utilsService.loaderStart--;
        }, 1000);
    }
    applyValidation() {
        this.fromDateToDateForm = this.formBuilder.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required]
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
            group.controls['fromDate'].setErrors({ required: true });
            group.controls['fromDate'].markAsTouched();
            return;
        }
    }

    getAccessLogData() {
        const formData = new FormData();
        formData.set('from_date', this.datepipe.transform(this.fromDate, 'yyyy-MM-dd'));
        formData.set('to_date', this.datepipe.transform(this.toDate, 'yyyy-MM-dd'));
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getActivityLogsAPI, formData, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.allAccessLogs = Deserialize(response, AccessLog);
            }
        });
    }

    download() {
        // console.log('Download', docId);
        // console.log('docName', docName);
        // console.log('asseType', asseType);
        const headers = new HttpHeaders()
            .append('ChannelID', 'WEB')
            .append('ReqID', '789654')
            .append('RequestDate', Date.parse(new Date().toString()).toString())
            .append('XkurateKey', 'KEY-WEB-#1014')
            .append('ApiToken', this.utilsService.getToken());
        const formData = new FormData();
        formData.set('from_date', this.datepipe.transform(this.fromDate, 'yyyy-MM-dd'));
        formData.set('to_date', this.datepipe.transform(this.toDate, 'yyyy-MM-dd'));
        this.http.post(UtilsService.URL + this.utilsService.serverVariableService.downloadActivityLogsAPI, formData, { responseType: 'arraybuffer', headers: headers })
            .subscribe(res => {
                const blob = new Blob([res], { type: 'application/octet-stream' });
                FileSaver.saveAs(blob, 'KurateAccessLogs.xls');
            }, err => {
                // console.log(err);
            });
    }

}
