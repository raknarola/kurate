import { UtilsService } from '../../services/utils.service';
import { UserDetails } from '../../models/UserDetails';
import { Role } from '../../models/Role';
import { Deserialize, Serialize } from 'cerialize';
import { Permissions } from '../../models/Permissions';
import { EnumForPermissions } from '../../shared/enums/EnumForPermissions.enum';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

import { ButtonRendererComponent } from '../buttonRender/button-renderer.component';
import { CheckboxRenderComponent } from '../checkboxRender/checkboxRender.component';
import { DeleteButtonRendererComponent } from '../buttonRender/delete-button-renderer.component';

@Injectable({
  providedIn: 'root'
})
export class UsersAndRolesService {

  // ag-grid Variables
  public gridApi;
  public gridColumnApi;
  public rowSelection; // for multiple checkbox
  public rowClassRules; // for row color new arrival,under business,hot pink
  public cellClassRules; // for row color new arrival,under business,hot pink

  @ViewChild('agGrid') agGrid: AgGridNg2;
  public defaultColDef;

  @ViewChild('agGrid3') agGrid3: AgGridNg2;
  @ViewChild('agGrid2') agGrid2: AgGridNg2;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  columnDefsForUserDetails = [
    {
      headerName: 'Id',
      field: 'id',
      width: 20,
      minWidth: 20,
    },
    {
      headerName: 'User Name',
      field: 'username',
      width: 30,
      minWidth: 30,
      // suppressSizeToFit: true
    },
    {
      headerName: 'Role',
      field: 'role.name',
      width: 20,
      minWidth: 20,
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      width: 25,
      minWidth: 25,
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      width: 25,
      minWidth: 25,
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 40,
      minWidth: 40,
      // suppressSizeToFit: true

    },
    {
      headerName: 'Status',
      field: 'status',
      width: 20,
      minWidth: 20,
    },
    {
      headerName: 'Date Added',
      field: 'created_at',
      type: ['dateColumn'],
      width: 30,
      minWidth: 30,
      // suppressSizeToFit: true,


      cellRenderer: (data) => {
        const date = new Date(data.value);
        const formatted_date = date.getDate() + ' ' + this.months[date.getMonth()] + ' ' + date.getFullYear();
        return formatted_date;
      }
    },
    {
      headerName: 'Date Updated',
      field: 'updated_at',
      type: ['dateColumn'],
      width: 25,
      minWidth: 25,
      cellRenderer: (data) => {
        const date = new Date(data.value);
        const formatted_date = date.getDate() + ' ' + this.months[date.getMonth()] + ' ' + date.getFullYear();
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
        onClick: this.openEditOrDeleteUserModal.bind(this)
      }
    },

  ];

  columnDefsForRole = [
    {
      headerName: 'Id',
      field: 'id',
      width: 15,
      minWidth: 15,
    },
    {
      headerName: 'Role',
      field: 'name',
      width: 40,
      minWidth: 40,
    },
    // {
    //   headerName: 'Permission',
    //   field: '123',
    //   width: 40,
    //   minWidth: 40,

    // },
    {
      headerName: 'Date Added',
      field: 'created_at',
      type: ['dateColumn'],
      width: 40,
      minWidth: 40,
      cellRenderer: (data) => {
        const date = new Date(data.value);
        const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
        return formatted_date;
      }
    },
    {
      headerName: 'Date Updated',
      field: 'updated_at',
      type: ['dateColumn'],
      width: 40,
      minWidth: 40,
      cellRenderer: (data) => {
        const date = new Date(data.value);
        const formatted_date = date.getDate() + ' ' + this.utilsService.months[date.getMonth()] + ' ' + date.getFullYear();
        return formatted_date;
      }
    },
    {
      headerName: 'Action',
      cellRenderer: 'buttonRenderer',
      filter: false,
      width: 20,
      minWidth: 20,
      cellRendererParams: {
        onClick: this.openEditOrDeleteRoleModal.bind(this)
      }
    },
  ];

  columnDefsForPermission = [
    {
      headerName: 'Path',
      field: 'name',
      editable: true,
      width: 60,
      minWidth: 60,
      filter: true,
      // cellEditor: 'agSelectCellEditor',
      // cellEditorParams: {
      //   values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
      // },
    },
    {
      headerName: 'View',
      field: 'permission.isView',
      cellRenderer: 'checkboxRenderer',
      width: 30,
      minWidth: 30,

      // cellRenderer: params => {
      //   return `<input type='checkbox'  ${params.value ? 'checked' : ''} />`;
      // }
    },
    {
      headerName: 'Delete',
      field: 'permission.isDelete',
      cellRenderer: 'checkboxRenderer',
      width: 30,
      minWidth: 30,
    },
    {
      headerName: 'Rename',
      field: 'permission.isRename',
      cellRenderer: 'checkboxRenderer',
      width: 30,
      minWidth: 30,
    },
    {
      headerName: 'Create',
      field: 'permission.isCreate',
      cellRenderer: 'checkboxRenderer',
      width: 30,
      minWidth: 30,
    },
    {
      headerName: 'Version',
      field: 'permission.isVersion',
      cellRenderer: 'checkboxRenderer',
      width: 30,
      minWidth: 30,
    },
    // {
    //   headerName: 'Workflow',
    //   field: 'permission.isWorkFlow',
    //   cellRenderer: 'checkboxRenderer',
    //   width: 30,
    //   minWidth: 30,
    // },
    {
      headerName: 'Action',
      cellRenderer: 'deleteButtonRenderer',
      width: 30,
      minWidth: 30,
      cellRendererParams: {
        onClick: this.openDeletePermissionModal.bind(this)
      }
    },
  ];
  public sortingOrder;
  frameworkComponents: any;

  public innerWidth: any;


  userForm: FormGroup;
  roleForm: FormGroup;
  filter: string;
  userObj = new UserDetails();
  roleObj = new Role();
  allUsers: Array<UserDetails> = new Array<UserDetails>();
  allRoles: Array<Role> = new Array<Role>();
  rolesForDropDown: Array<Role> = new Array<Role>();
  statusForUserModal: string;
  statusForRoleModal: string;
  flagForHideShowUserAndRole: boolean;
  errorArray: Array<string>;

  filterForUserDetails: string;
  filterForRole: string;

  // sorting for User Details
  keyForUserDetailsSorting: string; // set default
  reverseFlagForUserDetails: boolean;

  // sorting for Role
  keyForRoleSorting: string; // set default
  reverseFlagForRole: boolean;

  // pagination variables
  pagenumberForUserDetails = 1;
  pagenumberForRole = 1;
  itemsPerPage: number;

  arrayOfPermissions = new Array<Permissions>();

  userIdForDeleteAPI: number;
  roleIdForDeleteAPI: number;

  public isFullWidthCell;
  public fullWidthCellRenderer;

  flagForPasswordHideShow: boolean;

  username_prefix: string;

  permissionObjForDelete = new Permissions();


  constructor(public utilsService: UtilsService, public formBuilder: FormBuilder) {
    localStorage.removeItem('isSearched');
    localStorage.removeItem('breadCrumbs');
    localStorage.removeItem('folderKey');
    localStorage.removeItem('search-param');
    localStorage.removeItem('search-tags-param');
    localStorage.removeItem('assetView');
    localStorage.removeItem('orderBy');
    localStorage.removeItem('sortBy');
    this.utilsService.flagForHideShowSearchInput = false;
    if (this.utilsService.getLoginUsers().role_id !== 1) {
      this.utilsService.redirectTo('/admin/work_area/dashboard');
    }
    // this.utilsService.getOrganizationDetailsAPI();
    // this.columnDefs = ['User Name', 'Role', 'First Name', 'Last Name', 'Email', 'Status', 'Date Added', 'Date Modified'];
    this.sortingOrder = ['asc', 'desc'];
    this.pagenumberForRole = 1;
    this.itemsPerPage = 10;
    this.flagForPasswordHideShow = false;
    // this.allUsers = Deserialize([{ 'id': 1, 'company_id': 1, 'firstName': 'Kelly', 'lastName': 'genuus', 'email': 'kelly@genuus.in', 'username': 'Kelly', 'role_id': 1, 'api_token': 'lJGzVOhkO1Cy84QMupZmNVWe9JYdUtidVxyIHxsgKBDXLzFBilOkSElEuxh4J3dPBQNrlmZQVt4izxlj', 'created_at': '2020-02-10 06:40:39', 'updated_at': '2020-02-10 06:40:39' }, { 'id': 2, 'company_id': 1, 'firstName': 'Rohan', 'lastName': 'genuus', 'email': 'rohan@genuus.in', 'username': 'Rohan', 'role_id': 1, 'api_token': 'JDoRdIM1BFz8A8YFNQe4ruqExo2U9EFTrJumRAA7kBpGAhLeVPQCXDVCBmWmslPrpFE76hlqRihMxLIy', 'created_at': '2020-02-10 06:41:02', 'updated_at': '2020-02-10 06:41:02' }, { 'id': 3, 'company_id': 1, 'firstName': 'Jill', 'lastName': 'genuus', 'email': 'jill@genuus.in', 'username': 'Jill', 'role_id': 1, 'api_token': 'yc2w6Scz3aZNrSO3z9TAYm0G8GzDKrGCTHUlh18ATT2ZlRPei4niaxVQXglvm278YZGftWxQs59ARPT0', 'created_at': '2020-02-10 06:41:19', 'updated_at': '2020-02-10 06:41:19' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }, { 'id': 4, 'company_id': 1, 'firstName': 'Dhrumin', 'lastName': 'Ranoliya', 'email': 'dhrumin_ranoliya@techhive.co.in', 'username': 'dhrumin16', 'role_id': 1, 'api_token': 'T0wRh1enajaD9o8DBhyRP1qHgddyV03c45yyjkqQazUCWGUuipvb0Ip4x0fgZWh1qUneBDGSlNou5QIN', 'created_at': '2020-02-12 04:44:27', 'updated_at': '2020-02-12 04:44:27' }], UserDetails);
    // this.allRoles = Deserialize([{ 'id': 1, 'name': 'Admin', 'description': 'Admin permission', 'permission': '{\'\/\':[\'view\',\'delete\',\'rename\',\'create\',\'versions\',\'workflow\']}', 'created_at': '2020-02-10 06:40:36', 'updated_at': '2020-02-10 06:40:36' }, { 'id': 2, 'name': 'Designer', 'description': 'Designer permission', 'permission': '{\'\/folder1\':[\'view\',\'delete\',\'rename\',\'create\',\'versions\',\'workflow\'],\'\/folder2\':[\'view\']}', 'created_at': '2020-02-10 10:29:40', 'updated_at': '2020-02-10 10:29:40' }], Role);

    // set default User Details Sorting
    this.keyForUserDetailsSorting = 'name';
    this.reverseFlagForUserDetails = false;

    // set default Role Sorting
    this.keyForRoleSorting = 'name';
    this.reverseFlagForRole = false;

    this.statusForUserModal = 'Add';
    this.statusForRoleModal = 'Add';
    this.flagForHideShowUserAndRole = false;
    this.frameworkComponents = { deleteButtonRenderer: DeleteButtonRendererComponent, buttonRenderer: ButtonRendererComponent, checkboxRenderer: CheckboxRenderComponent };

    this.isFullWidthCell = function (rowNode) {
      return rowNode.data.fullWidth;
    };
    this.defaultColDef = { resizable: true };
    this.fullWidthCellRenderer = 'fullWidthCellRenderer';
    // if (!this.utilsService.isNullUndefinedOrBlank(this.utilsService.getLoginUsers())) {

    //   this.username_prefix = this.utilsService.getLoginUsers().company.organization.prefix;
    // }
  }

  /**
* @returns grid value on load of page
*/
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowSelection = 'multiple';
    // this.getAllDetailsOfLabels();
    // this.gridApi.suppressHorizontalScroll = false;
    // this.gridApi.api.sizeColumnsToFit();
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);

  }

  addItemsAtIndex() {
    const newItems = new Permissions();
    newItems.name = '/';
    newItems.permission = new Permissions();
    this.arrayOfPermissions.push(newItems);
    if (this.arrayOfPermissions.length > 0) {

      this.gridApi.updateRowData({ add: [newItems], addIndex: this.arrayOfPermissions.length + 1 });
    } else {
      this.gridApi.updateRowData({ add: [newItems] });
    }
    this.gridApi.refreshCells();
  }

  applyUserValidations() {
    this.userForm = this.formBuilder.group({
      'userName': [null, Validators.compose([Validators.pattern(this.utilsService.validationService.PATTERN_FOR_USER_NAME_WITH_DOT)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_EMAIL)])],
      'role': [null, Validators.compose([Validators.required])],
      'firstName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ONLY_ALPHABATES)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_ONLY_ALPHABATES)])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_PASSWORD)])]
    });
    this.userForm.controls['userName'].disable();
  }
  applyRoleValidations() {
    this.roleForm = this.formBuilder.group({
      'roleName': [null, Validators.compose([Validators.required, Validators.pattern(this.utilsService.validationService.PATTERN_FOR_USER_ROLE_NAME)])],
      'description': [null],
    });
  }

  createUserName(firstName, lastName) {
    this.userObj.username = null;
    if (!this.utilsService.isNullUndefinedOrBlank(firstName) && !this.utilsService.isNullUndefinedOrBlank(lastName)) {

      this.userObj.username = this.username_prefix + '.' + firstName + '.' + lastName;
    } else if (!this.utilsService.isNullUndefinedOrBlank(firstName) && this.utilsService.isNullUndefinedOrBlank(lastName)) {
      this.userObj.username = this.username_prefix + '.' + firstName;

    } else if (this.utilsService.isNullUndefinedOrBlank(firstName) && !this.utilsService.isNullUndefinedOrBlank(lastName)) {
      this.userObj.username = this.username_prefix + '.' + lastName;

    }
  }
  getAllUsers() {
    const param = {};

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getUsersAPI, param, (response, isResponsOnPag) => {

      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        // this.pagenumberForUserDetails = 1;
        this.allUsers = Deserialize(response, UserDetails);
        // this.allUsers.filter(val => {
        //   this.allUsers.push(val);
        // });
        // this.agGrid.columnApi.sizeColumnsToFit(1370);
        this.agGrid.api.sizeColumnsToFit();

      }
    });
  }

  getAllRoles() {
    const param = {};

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.getRoles, param, (response, isResponsOnPag) => {

      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        this.allRoles = Deserialize(response, Role);
        this.pagenumberForRole = 1;
        this.rolesForDropDown = Deserialize(response, Role);
        // this.agGrid2.columnApi.sizeColumnsToFit(this.innerWidth);
        // this.agGrid2.api.sizeColumnsToFit();
      }
    });
  }


  saveUserDetails(status: string) {
    const formData = new FormData();
    this.userObj.company_id = this.utilsService.getLoginUsers().company_id;
    // if (status === 'Edit') {
    //   this.userObj.user_id = this.userObj.id;
    //   this.userObj.id = undefined;
    // }
    const obj = Serialize(this.userObj, UserDetails);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.set(key, obj[key]);
      }
    }
    if (status === 'Add') {

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.manageUsersAPI, formData, (response, isResponseOnPage) => {
        this.errorArray = [];
        // console.log(response);

        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          if (!isResponseOnPage) {

            this.utilsService.hideModal('adduserModal');
            this.getAllUsers();
            this.resetUserModal();
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

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.updateUserAPI, formData, (response, isResponseOnPage) => {
        this.errorArray = [];
        // console.log(response);

        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          if (!isResponseOnPage) {

            this.utilsService.hideModal('adduserModal');
            this.getAllUsers();
            this.resetUserModal();
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
  onCellValueChanged(event) {
    // console.log(event);
    if (event.colDef.headerName === 'Path') {

      this.arrayOfPermissions[event.rowIndex].name = event.value;
      // console.log(this.arrayOfPermissions[event.rowIndex].name);
    }

  }

  cellValueStarted(event) {
    console.log(event);

  }
  cellEditingStopped(event) {
    console.log(event);

  }

  saveRole(status: string) {
    // console.log(value);
    // console.log(this.arrayOfPermissions);

    const arrayOfString = [];
    const arrayOfKeyValueObj = [];
    const param = new Object();
    const newObj = this.arrayOfPermissions.filter(val => {
      const arrayOfValues = [];
      if (val.permission.isView) {
        arrayOfValues.push(EnumForPermissions.VIEW);
      }
      if (val.permission.isDelete) {
        arrayOfValues.push(EnumForPermissions.DELETE);
      }
      if (val.permission.isRename) {
        arrayOfValues.push(EnumForPermissions.RENAME);
      }
      if (val.permission.isCreate) {
        arrayOfValues.push(EnumForPermissions.CREATE);
      }
      if (val.permission.isVersion) {
        arrayOfValues.push(EnumForPermissions.VERSION);
      }
      if (val.permission.isWorkFlow) {
        arrayOfValues.push(EnumForPermissions.WORKFLOW);
      }

      // obj.value = arrayOfValues;
      param[val.name] = arrayOfValues;
      // arrayOfKeyValueObj.push(obj);


    });
    this.roleObj.permission = JSON.stringify(param);
    const formData = new FormData();
    // if (status === 'Edit') {
    //   console.log(this.roleObj.id);

    //   this.roleObj.role_id = this.roleObj.id;
    //   this.roleObj.id = undefined;
    // }
    const obj = Serialize(this.roleObj, Role);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.set(key, obj[key]);
      }
    }
    if (status === 'Add') {
      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.manageRolesAPI, formData, (response, isResponseOnPage) => {
        this.errorArray = [];
        // console.log(response);

        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          if (!isResponseOnPage) {

            this.utilsService.hideModal('addroleModal');
            this.getAllRoles();
            this.resetRoleModal();
          } else {
            this.errorArray.push(response);
          }
        }
      }, true);
    } else if (status === 'Edit') {
      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.updateRoleAPI, formData, (response, isResponseOnPage) => {
        this.errorArray = [];
        // console.log(response);

        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          if (!isResponseOnPage) {

            this.utilsService.hideModal('addroleModal');
            this.getAllRoles();
            this.resetRoleModal();
          } else {
            this.errorArray.push(response);
          }
        }
      }, true);
    }
  }

  openEditOrDeleteUserModal(event) {
    if (event.value === 'Edit') {
      this.openUserModal(event, undefined);
    } else if (event.value === 'Delete') {
      this.openDeleteUserModal(event);
    }
  }
  openEditOrDeleteRoleModal(event) {
    if (event.value === 'Edit') {
      this.openRoleModal(event, undefined);
    } else if (event.value === 'Delete') {
      this.openDeleteRoleModal(event);
    }
  }

  openDeletePermissionModal(event) {
    this.permissionObjForDelete = Deserialize(event.rowData, Permissions);
    this.utilsService.openModal('deletePermissionModal');
  }

  deletePermissionFromArray() {
    // console.log(this.arrayOfPermissions.findIndex(val => val.name === this.permissionObjForDelete.name));
    const index = this.arrayOfPermissions.findIndex(val => val.name === this.permissionObjForDelete.name);
    this.arrayOfPermissions.splice(index, 1);
    this.utilsService.hideModal('deletePermissionModal');
    this.agGrid3.api.setRowData(this.arrayOfPermissions);
    // console.log(this.arrayOfPermissions);
  }

  openUserModal(event, status) {
    // console.log(event);

    this.statusForUserModal = status ? status : event.value;
    this.userObj = new UserDetails();
    if (this.statusForUserModal === 'Add') {
      this.userForm.controls['password'].enable();

    } else if (this.statusForUserModal === 'Edit') {
      this.userForm.controls['password'].disable();
      this.userObj = Deserialize(event.rowData, UserDetails);
    }
    this.utilsService.openModal('adduserModal');
  }

  openRoleModal(event, status) {
    // console.log(event);
    this.statusForRoleModal = status ? status : event.value;
    this.roleObj = new Role();
    this.arrayOfPermissions = new Array<Permissions>();
    this.errorArray = new Array<string>();
    if (this.statusForRoleModal === 'Add') {

    } else if (this.statusForRoleModal === 'Edit') {
      this.roleObj = Deserialize(event.rowData, Role);
      // console.log(this.roleObj);
      const permissionObj = JSON.parse(this.roleObj.permission);

      for (const key in permissionObj) {
        if (permissionObj.hasOwnProperty(key)) {
          // console.log(key);
          const perObj = new Permissions();
          perObj.name = key;
          // console.log(permissionObj[key]);
          perObj.permission = Deserialize(this.setPermissionArray(permissionObj[key]), Permissions);
          this.arrayOfPermissions.push(perObj);

        }
      }
      // console.log(JSON.stringify(this.arrayOfPermissions));

    }
    // this.agGrid3.columnApi.sizeColumnsToFit(767);
    this.agGrid3.api.sizeColumnsToFit();
    this.utilsService.openModal('addroleModal');
  }

  setPermissionArray(arrayOfPermission) {
    // console.log(arrayOfPermission);

    const obj = new Permissions();
    const array: Array<string> = arrayOfPermission;
    const obj1 = array.filter(val => {
      switch (val) {
        case EnumForPermissions.VIEW: {
          obj.isView = true;
          break;
        }
        case EnumForPermissions.DELETE: {
          obj.isDelete = true;
          break;
        }
        case EnumForPermissions.RENAME: {
          obj.isRename = true;
          break;
        }
        case EnumForPermissions.CREATE: {
          obj.isCreate = true;
          break;
        }
        case EnumForPermissions.VERSION: {
          obj.isVersion = true;
          break;
        }
        case EnumForPermissions.WORKFLOW: {
          obj.isWorkFlow = true;
          break;
        }


        default:
          break;
      }
    });

    return obj;

  }

  openDeleteUserModal(event) {
    this.userIdForDeleteAPI = event.rowData.id;
    this.utilsService.openModal('deleteUserModal');
  }
  openDeleteRoleModal(event) {
    this.roleIdForDeleteAPI = event.rowData.id;
    this.utilsService.openModal('deleteRoleModal');
  }

  deleteUserById(userId) {
    const formData = new FormData();
    formData.set('user_id', userId);

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteUserAPI, formData, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        console.log('User Deleted Successfully');
        this.utilsService.hideModal('deleteUserModal');
        this.getAllUsers();
      }
    }, true);
  }
  deleteRoleById(roleId) {
    const formData = new FormData();
    formData.set('role_id', roleId);

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteRoleAPI, formData, (response, isResponseOnpAge) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        if (!isResponseOnpAge) {

          console.log('Role Deleted Successfully');
          this.getAllRoles();
          this.utilsService.hideModal('deleteRoleModal');
        } else {
          this.utilsService.toasterService.error(response, '', {
            positionClass: 'toast-top-right',
            closeButton: true
          });
        }
      }
    }, true);
  }

  setSearchNgModel(value) {
    if (this.flagForHideShowUserAndRole === false) {
      this.filterForUserDetails = value;
    } else if (this.flagForHideShowUserAndRole === true) {
      this.filterForRole = value;
    }
  }

  sortingForUserDetails(key) {
    this.keyForUserDetailsSorting = key;
    this.reverseFlagForUserDetails = !this.reverseFlagForUserDetails;
  }

  sortingForRole(key) {
    this.keyForRoleSorting = key;
    this.reverseFlagForRole = !this.reverseFlagForRole;
  }

  resetUserModal() {
    this.userObj = new UserDetails();
    this.errorArray = [];
    this.applyUserValidations();
  }
  resetRoleModal() {
    this.roleObj = new Role();
    this.errorArray = [];

    this.arrayOfPermissions = undefined;
    this.applyRoleValidations();
  }

  changeTab(tabName) {
    if (tabName === 'User') {
      this.flagForHideShowUserAndRole = false;
    } else if (tabName === 'Role') {
      this.flagForHideShowUserAndRole = true;
      this.agGrid2.api.sizeColumnsToFit();
    }
    // if (this.flagForHideShowUserAndRole === false) {

    // var allColumnIds = [];
    // this.agGrid2.columnApi.getAllColumns().forEach((column) => {
    //   console.log(column.getId());

    //   allColumnIds.push(column.getId());
    // });
    // this.agGrid2.columnApi.autoSizeColumns(allColumnIds);
    // }

    // this.flagForHideShowUserAndRole = !this.flagForHideShowUserAndRole;
  }

}
