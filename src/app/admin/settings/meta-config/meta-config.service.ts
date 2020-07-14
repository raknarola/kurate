import { Injectable, ViewChild } from '@angular/core';
import { MetaData } from '../../../models/Meta-Data';
import { UtilsService } from '../../../services/utils.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonRendererComponent } from '../../buttonRender/button-renderer.component';
import { DeleteButtonRendererComponent } from '../../buttonRender/delete-button-renderer.component';
import { AgGridNg2 } from 'ag-grid-angular';
import { Deserialize, Serialize } from 'cerialize';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class MetaConfigService {

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
  allElements: Array<MetaData> = new Array<MetaData>();
  metaConfigForm: FormGroup;
  metaConfigIdForDelete: number;
  errorArray = [];
  arrayOfMetaData: Array<MetaData> = new Array<MetaData>();
  metaDataObj = new MetaData();
  public isFullWidthCell;
  arrayOfStatus = [{ id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }];
  arrayOfValues = [];
  arrayOfElementType = [
    { id: 1, name: 'InputBox' },
    { id: 2, name: 'TextArea' },
    { id: 3, name: 'DatePicker' },
    { id: 4, name: 'CheckBox' }
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fullWidthCellRenderer: string;
  columnDefsForMetaConfig = [
    {
      headerName: 'Id',
      field: 'id',
      width: 30,
      minWidth: 30
    },
    {
      headerName: 'Name',
      field: 'field_name',
      width: 40,
      minWidth: 40
    },
    {
      headerName: 'Description',
      field: 'description',
      width: 40,
      minWidth: 40
    },
    {
      headerName: 'Element Type',
      field: 'input_type',
      width: 40,
      minWidth: 40
    },
    {
      headerName: 'Value',
      field: 'values',
      width: 40,
      minWidth: 40
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 40,
      minWidth: 40,
      cellRenderer: (data) => {
        // console.log(data.value);

        return data.value === '1' ? 'Active' : 'Inactive';
      }
    },
    {
      headerName: 'Created Date',
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
      headerName: 'Action',
      field: 'edit_delete_icon',
      cellRenderer: 'buttonRenderer',
      width: 20,
      minWidth: 20,
      cellRendererParams: {
        onClick: this.openDeleteMetaConfigModal.bind(this)
      }
    },
  ];

  @ViewChild('agGrid') agGrid: AgGridNg2;

  constructor(public utilsService: UtilsService, public datepipe: DatePipe, public http: HttpClient, public formBuilder: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonRendererComponent,
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

  applyMetaDataValidations() {
    this.metaConfigForm = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT)])],
      'description': [null],
      'elementType': [null, Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
      'values': [''],
    });
  }
  resetMetaDataModal() {
    this.errorArray = [];
    this.metaDataObj = new MetaData();
    this.applyMetaDataValidations();
    this.arrayOfValues = [];
  }

  openMetaModal() {
    this.metaDataObj = new MetaData();
    this.arrayOfValues = [];
    this.applyMetaDataValidations();
    this.utilsService.openModal('addMetaDataModal');
  }

  openDeleteMetaConfig(event) {

    if (event.value === 'Delete') {
      this.openDeleteMetaConfigModal(event);
    }
  }

  getMetaElements() {
    const param = {};
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getMetaElementsAPI, param, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.allElements = Deserialize(response, MetaData);
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {
      this.arrayOfValues.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(tag): void {

    const index = this.arrayOfValues.indexOf(tag);
    if (index >= 0) {
      this.arrayOfValues.splice(index, 1);
    }
  }

  onSelect() {
    // console.log(this.metaDataObj.values);

  }

  createMetaField() {
    this.metaDataObj.values = this.arrayOfValues;
    const formData = new FormData();
    const obj = Serialize(this.metaDataObj, MetaData);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.set(key, obj[key]);
      }
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.createMetaFieldsAPI, formData, (response, isResponseOnPage) => {
      this.errorArray = [];
      // console.log(response);

      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        if (!isResponseOnPage) {

          this.utilsService.hideModal('addMetaDataModal');
          this.getMetaFields();
          this.resetMetaDataModal();
        } else {
          this.errorArray.push(response);
        }
      }
    }, true);
  }

  getMetaFields() {
    const param = {};
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getMetaFieldsAPI, param, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.arrayOfMetaData = Deserialize(response, MetaData);
      }
    });
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

  openDeleteMetaConfigModal(event) {
    this.metaConfigIdForDelete = event.rowData.id;
    this.utilsService.openModal('deleteMetaConfigModal');
  }

  deleteMetaConfigById(id) {
    const formData = new FormData();
    formData.set('meta_field_id', id);

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteMetaFieldsAPI, formData, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        // console.log('User Deleted Successfully');
        this.utilsService.hideModal('deleteMetaConfigModal');
        this.getMetaFields();
      }
    }, true);
  }
}
