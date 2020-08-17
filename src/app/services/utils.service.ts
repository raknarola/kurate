import { Injectable } from '@angular/core';
import { ServerVariableService } from './server-variable.service';
import { Router } from '@angular/router';
import { ValidationsService } from './validations.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Deserialize, Serialize } from 'cerialize';
import { ResponseWrapperDTO } from '../models/response/ResponseWrapperDTO';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from '../models/UserDetails';
import { Assets } from '../models/Assets';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
// import S3 from 'aws-s3';
import { Organization } from '../models/Organization';
import { Permissions } from '../models/Permissions';
import { EnumForPermissions } from '../shared/enums/EnumForPermissions.enum';
import { EnumforExtension } from '../shared/enums/enumforextension.enum';
declare var $: any;
// import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Tags } from '../models/Tags';
import * as fileSaver from 'file-saver';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    // static URL = 'http://13.234.132.85/';
    static URL = 'http://uat-api-server.genuusdemo.com/';
    static FRONT_URL = 'http://uat-kurate-an.genuusdemo.com/';
    // static URL = 'https://api.kurate.app/';
    // static FRONT_URL = 'https://api.kurate.app/';

    flagForHideMenuForShareLinkPage: boolean;
    flagForhideShowUploadingFiles: boolean;
    flagForRefreshPage = 0;
    arrayOfSelectedFiles: Array<Assets> = new Array<Assets>();
    copyOrReplaceAssetArray: Array<Assets> = new Array<Assets>();
    public files: NgxFileDropEntry[] = [];
    formData = new FormData();
    errorMsgArray = new Array<{ errormsg: string }>();
    flagForShowErrorMsg: boolean;
    allPermissions: string;
    flagForInvalidSizeMsg: boolean;
    flagForDuplicateFileMsg: boolean;
    fileExistorNotFlag: boolean;
    togglemore: boolean;
    organizationObj = new Organization();
    keyForFolderName: string;
    allAssets: Array<Assets> = new Array<Assets>();
    flagForHideShowBackButton: boolean;
    arrayOfSearchAssets: Array<Assets> = new Array<Assets>();
    searchNgModel = [];
    flagForHideShowAssestLabel: boolean;
    flagForHideShowSearchInput: boolean;
    mainSearchNgModel: string;
    uploadCompleteCount: number;
    seletedFilType: string;
    fromDate: Date;
    toDate: Date;
    assetIdForGetFolderAssetsOnDelete: number;
    assetIdForFolderId: number;
    rootFolder: string;
    headersearchNgModel: string;
    scroll: any;
    offsetCount: number;
    previousOffset: number;
    headermainSearchNgModel: string;
    uploadArray = [];
    arrayOfBreadCrumb: Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }> = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    flagForHideHeaderSearch: boolean;
    isBreadCrumb: boolean;
    enumForPermisson = EnumForPermissions;
    arrayOfPermissionForAssets = new Array<Permissions>();
    folderNameForCreateNewFolderAPI: string;
    formForCreateFolder: FormGroup;
    arrayOfTags: Array<Tags> = new Array<Tags>();
    isFileDropzone: boolean;
    loaderStart = 0;
    isSearch: boolean;
    arrayOfSearchedTags: [];
    flagforHideUploadingPlusButton = false;
    arrayOfSelectedAssets = new Array<number>();
    arrayOfapiNameToExcludeToken = [this.serverVariableService.loginAPI];
    toastConfig = {
        disableTimeOut: true,
        timeOut: 0,
        positionClass: 'toast-top-center',
        closeButton: true,
    };
    statusOfAction: string;
    orderByForGridView = 'created_at';
    orderByForListView = 'created_at';
    reverseFlagForGridView: boolean;
    reverseFlagForListView: boolean;
    flagAfterSelection = false;
    increaseFlag = 0;

    constructor(
        public http: HttpClient,
        public router: Router,
        public formBuilder: FormBuilder,
        public serverVariableService: ServerVariableService,
        public toasterService: ToastrService,
        public datepipe: DatePipe,
        public validationService: ValidationsService
    ) {
        this.flagForHideMenuForShareLinkPage = false;
        this.flagForhideShowUploadingFiles = false;
        this.flagForHideHeaderSearch = false;
        this.flagForHideShowSearchInput = false;
        this.togglemore = false;
        this.isFileDropzone = false;
        this.flagForHideShowAssestLabel = false;
        this.flagForHideShowBackButton = false;
        this.isBreadCrumb = false;
        this.isSearch = false;
        this.offsetCount = 0;
        this.previousOffset = 0;
        this.flagforHideUploadingPlusButton = false;
        if (this.getLoginUsers()) {
            this.getOrganizationDetailsAPI();
        }
        this.getList();
    }

    /**
    * @author : Dhrumin-Ranoliya
    * @param isDisplayToast display toast or not , pass true or false
    * @param url API name
    * @param params params
    * @param callback response of server
    */
    postMethodAPI(isDisplayToast, apiName, params, callback: (response: any, isResponseOnPage: boolean) => void, isCrudAPI?: boolean, sharedToken?: string, redirectTo?: string, isLoaderRequired?: boolean, isDataRequired?: boolean) {
        if (!isLoaderRequired) {
            this.loaderStart++;
        }
        this.customJsonInclude(params);
        let headers = new HttpHeaders()
            .append('ChannelID', 'WEB')
            .append('ReqID', '789654')
            .append('RequestDate', Date.parse(new Date().toString()).toString())
            .append('XkurateKey', 'KEY-WEB-#1014');
        // if (apiName === 'api/listCollections') {
        // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // }
        if (this.arrayOfapiNameToExcludeToken.indexOf(apiName) < 0) {
            if (apiName === 'api/forgotPassword') {
                headers = headers.append('ApiToken', 'yc2w6Scz3aZNrSO3z9TAYm0G8GzDKrGCTHUlh18ATT2ZlRPei4niaxVQXglvm278YZGftWxQs59ARPT0');
            } else {
                if (!this.isEmptyObjectOrNullUndefiend(sharedToken)) {
                    headers = headers.append('ApiToken', sharedToken);
                } else {
                    headers = headers.append('ApiToken', this.getToken());
                }
            }
        }
        apiName = UtilsService.URL + apiName;
        return this.http.post(apiName, params, { headers: headers }).subscribe(response => {
            // Read the result field from the JSON response.
            if (!isLoaderRequired) {
                if (this.loaderStart > 0) {
                    this.loaderStart--;
                }
            }
            const serverResponse: ResponseWrapperDTO = Deserialize(response, ResponseWrapperDTO);
            if (serverResponse.response === 111) {
                if (isDisplayToast) {
                    this.toasterService.success(serverResponse.message, '', {
                        positionClass: 'toast-top-right',
                        closeButton: true
                    });
                }
                if (isDataRequired) {
                    callback(serverResponse.result, false);
                } else {
                    if (isCrudAPI) {
                        callback(serverResponse.message, false);
                    } else {
                        callback(serverResponse.result, false);
                    }
                }
            } else if (serverResponse.response === 0) {
                if (isDataRequired) {
                    callback(serverResponse.message, true);
                } else {
                    if (isCrudAPI) {
                        callback(serverResponse.message, true);
                    } else {
                        this.toasterService.error(serverResponse.message, '', {
                            positionClass: 'toast-top-right',
                            closeButton: true
                        });
                        if (!this.isNullUndefinedOrBlank(redirectTo)) {
                            localStorage.removeItem('breadCrumbs');
                            this.isSearch = true;
                            this.redirectTo(redirectTo);
                        }
                    }
                }
            }
        });
    }

    accessFolderAndUploadFile(event, object: Assets, type: string) {
        // this.openFolder(object);
        // this.dropped(event, type, this.keyForFolderName ? this.keyForFolderName + '/' : undefined);
    }

    getToken(): any {
        return localStorage.getItem('token') ? localStorage.getItem('token') : null;
    }

    download(downurl, docName) {
        return this.http.get(downurl, {
            reportProgress: true,
            responseType: 'blob'
        }).pipe(map(res => {
            fileSaver(res, docName);
        }), catchError((err) => {
            console.log(err);
            return err;
        }));
    }

    /**
    * This Method Is Use For Remove Blank And Null Key From Object.
    */
    customJsonInclude(obj): void {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                if (obj[key] && obj[key].length > 0) {
                    obj[key] = this.removeEmptyElementsFromArray(obj[key]);
                }
                if (this.isEmptyObject(obj[key])) {
                    delete obj[key];
                } else {
                    this.customJsonInclude(obj[key]);
                }
            } else {
                if (obj[key] === undefined || obj[key] === null) {
                    delete obj[key];
                }
            }
        }
    }

    /**
    * This Method Is Use From Remove Empty Element From Array
    * @param test_array  your selected array pass as args.
    */
    removeEmptyElementsFromArray(test_array): Array<any> {
        let index = -1;
        const arr_length = test_array ? test_array.length : 0;
        let resIndex = -1;
        const result = [];
        while (++index < arr_length) {
            const id = test_array[index];
            if (id) {
                result[++resIndex] = id;
            }
        }
        return result;
    }

    /*
    *
    * Used to check if object ios empaty or not..!
    * @param obj = 'indecated object which you want to check'
    * return true if empty..!
    */
    isEmptyObject(obj): boolean {
        return (obj && (Object.keys(obj).length === 0));
    }

    removeDublicateSpaceFromString(str?: string): string {
        return str.replace(/\s+/g, ' ');
    }

    isAuthenticated(): string {
        return localStorage.getItem('isAuthenticate') ? localStorage.getItem('isAuthenticate') : null;
    }

    isNullUndefinedOrBlank(obj): boolean {
        if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
            return true;
        }
        return false;
    }

    isEmptyObjectOrNullUndefiend(...value): boolean {
        if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (this.isNullUndefinedOrBlank(value[i]) || this.isEmptyObject(value[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    redirectTo(...route): void {
        this.router.navigate(route);
    }

    redirectToWithQueryParam(param, route: Array<string>): void {
        console.warn(param);
        console.warn(route);
        this.router.navigate(route, { queryParams: param });
    }

    getLoginUsers(): UserDetails {
        const user = Serialize(JSON.parse(localStorage.getItem('user')), UserDetails);
        if (user != null) {
            return user;
        }
    }

    getUserRoleByRoleName(role): boolean {
        return this.getLoginUsers().role['name'] === role ? true : false;
    }


    /**
     * @author Dhrumin Ranoliya
     * @param modalId : id for hideModal
     * @function hideModal used for hide opened modal using modalId
     */
    hideModal(modalId: string) {
        $('' + '#' + modalId + '').modal('hide');
    }

    /**
     * @author Dhrumin Ranoliya
     * @param modalId : id for openModal
     * @function openModal used for open modal using modalId
     */
    openModal(modalId: string) {
        $('' + '#' + modalId + '').modal({ backdrop: 'static', keyboard: false });
    }

    /* To copy Text from Textbox */
    copyInputMessage(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    }

    /* To copy any Text */
    copyText(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    async dropped(files: NgxFileDropEntry[], type: string, folderDropedKey: string, assets: Assets) {
        const fileSize = 104857600;
        this.files = files;
        this.flagForShowErrorMsg = false;
        this.isFileDropzone = false;
        this.flagForInvalidSizeMsg = false;
        this.flagForDuplicateFileMsg = false;
        if (this.flagForhideShowUploadingFiles === false) {
            this.arrayOfSelectedFiles = new Array<Assets>();
        }
        const index2 = this.arrayOfPermissionForAssets.findIndex(val => val.name === '/');
        if (index2 !== -1) {
            if (this.arrayOfPermissionForAssets[index2].isCreate === true) {
                // this.errorMsgArray = new Array<{ errormsg: string }>();
                // console.log('!this.isNullUndefinedOrBlank(assets) => ', this.isNullUndefinedOrBlank(assets));
                if (!this.isNullUndefinedOrBlank(assets)) {
                    this.openFolder(assets, 'created_at.desc');
                }
                for (const droppedFile of files) {
                    if (droppedFile.fileEntry.isFile) {
                        const ext = droppedFile.relativePath.split('.').pop();
                        const ext1 = (ext).toLowerCase();
                        if (ext1) {
                            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                            fileEntry.file(async (file: File) => {
                                const flagForDuplicateFile = false;
                                const totalFileSize = 0;
                                // if (!this.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
                                //   console.log(this.arrayOfSelectedFiles);
                                //   const flag1 = this.arrayOfSelectedFiles.filter(val => {
                                //     console.log(typeof val.asset_size);
                                //     totalFileSize += val.asset_size;
                                //     if (val.file.name === file.name) {
                                //       console.log('match');
                                //       flagForDuplicateFile = true;
                                //       // const errorMsg = { errormsg: file.name + 'is already uploaded.' };
                                //       this.errorMsgArray.push({ errormsg: '"' + file.name + '"' + ' ' + ' is already uploaded.' });
                                //     }
                                //   });
                                // }
                                // console.log(totalFileSize);
                                if (!flagForDuplicateFile) {
                                    // if (totalFileSize + file.size <= fileSize) {
                                    let relativePath = (type === 'Files' ? droppedFile.relativePath : file['webkitRelativePath']);
                                    if (!this.isNullUndefinedOrBlank(folderDropedKey)) {
                                        relativePath = folderDropedKey + relativePath;
                                    }
                                    relativePath = relativePath.replace(/[^a-zA-Z0-9./]/g, '_');
                                    const obj = this.checkFileExistOrNot('origin/assets/' + relativePath).then(val1 => {
                                        // Here you can access the real file
                                        const file1 = new Blob([file], { type: 'application/pdf' });
                                        const fileURL = URL.createObjectURL(file1);
                                        const attachment = new Assets();
                                        attachment.key = 'origin/assets/' + relativePath;
                                        // attachment.documentName = fileURL;
                                        attachment.file = file;
                                        attachment.name = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                                        attachment.asset_size = +file.size;
                                        attachment.progress = Number(0);
                                        attachment.file_type = file.type;
                                        // console.log(val1);
                                        if (val1 === 'Asset found') {
                                            // this.openModal('copyOrReplaceAssetModal');
                                            // console.log(attachment);
                                            this.flagForhideShowUploadingFiles = true;
                                            this.togglemore = true;
                                            attachment.isCopyReplace = true;
                                            this.arrayOfSelectedFiles.push(attachment);
                                            this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                        } else {
                                            this.flagForhideShowUploadingFiles = true;
                                            this.togglemore = true;
                                            attachment.isCopyReplace = false;
                                            this.arrayOfSelectedFiles.push(attachment);
                                            // this.arrayOfSelectedFiles = [...this.arrayOfSelectedFiles];
                                            // console.log(this.arrayOfSelectedFiles);
                                            const key = 'origin/assets/' + relativePath;
                                            this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                            this.uploadFile(attachment, key, this.arrayOfSelectedFiles.findIndex(val => val.key === 'origin/assets/' + relativePath));
                                        }
                                    });
                                } else {
                                    // console.log('File Size Error');
                                    const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                                    // console.log(index);
                                    files.splice(index, 1);
                                    this.flagForDuplicateFileMsg = true;
                                }
                            });
                        } else {
                            // console.log('invalid file');
                            const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                            files.splice(index, 1);
                            // this.flagForShowErrorMsg = true;
                        }
                    } else {
                        // It was a directory (empty directories are added, otherwise only files)
                        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                        // console.log(droppedFile.relativePath, fileEntry);
                    }
                }
            } else {
                // this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                //   positionClass: 'toast-top-right',
                //   closeButton: true
                // });
                this.openModal('warningModal');
            }
        } else if (!this.isNullUndefinedOrBlank(this.allPermissions)) {
            console.log(this.allPermissions);
            const index1 = this.arrayOfPermissionForAssets.findIndex(val => val.name === this.allPermissions);
            if (this.allPermissions === '/') {
                if (index1 !== -1) {
                    console.log('ifff');
                    if (this.arrayOfPermissionForAssets[index1].isCreate === true) {
                        // this.errorMsgArray = new Array<{ errormsg: string }>();
                        if (!this.isNullUndefinedOrBlank(assets)) {
                            this.openFolder(assets, 'created_at.desc');
                        }
                        for (const droppedFile of files) {
                            console.log(droppedFile);
                            // Is it a file?
                            if (droppedFile.fileEntry.isFile) {
                                const ext = droppedFile.relativePath.split('.').pop();
                                const ext1 = (ext).toLowerCase();
                                if (ext1) {
                                    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                                    console.log(fileEntry);
                                    fileEntry.file(async (file: File) => {
                                        const flagForDuplicateFile = false;
                                        const totalFileSize = 0;
                                        // if (!this.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
                                        //   console.log(this.arrayOfSelectedFiles);
                                        //   const flag1 = this.arrayOfSelectedFiles.filter(val => {
                                        //     console.log(typeof val.asset_size);
                                        //     totalFileSize += val.asset_size;
                                        //     if (val.file.name === file.name) {
                                        //       console.log('match');
                                        //       flagForDuplicateFile = true;
                                        //       // const errorMsg = { errormsg: file.name + 'is already uploaded.' };
                                        //       this.errorMsgArray.push({ errormsg: '"' + file.name + '"' + ' ' + ' is already uploaded.' });
                                        //     }
                                        //   });
                                        // }
                                        // console.log(totalFileSize);
                                        if (!flagForDuplicateFile) {
                                            // if (totalFileSize + file.size <= fileSize) {
                                            let relativePath = (type === 'Files' ? droppedFile.relativePath : file['webkitRelativePath']);
                                            if (!this.isNullUndefinedOrBlank(folderDropedKey)) {
                                                // console.log(folderDropedKey);
                                                // console.log('Relative');
                                                relativePath = folderDropedKey + relativePath;
                                            }
                                            relativePath = relativePath.replace(/[^a-zA-Z0-9./]/g, '_');
                                            // console.log(relativePath);
                                            // console.log(type);
                                            const obj = this.checkFileExistOrNot('origin/assets/' + relativePath).then(val1 => {
                                                // Here you can access the real file
                                                // console.log(droppedFile.relativePath, file);
                                                const file1 = new Blob([file], { type: 'application/pdf' });
                                                const fileURL = URL.createObjectURL(file1);
                                                // console.log('fileLength: ' + files.length);
                                                const attachment = new Assets();
                                                attachment.key = 'origin/assets/' + relativePath;
                                                // attachment.documentName = fileURL;
                                                attachment.file = file;
                                                attachment.name = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                                                attachment.asset_size = +file.size;
                                                attachment.progress = Number(0);
                                                attachment.file_type = file.type;
                                                // console.log(val1);
                                                if (val1 === 'Asset found') {
                                                    // this.openModal('copyOrReplaceAssetModal');
                                                    // console.log(attachment);
                                                    this.flagForhideShowUploadingFiles = true;
                                                    this.togglemore = true;
                                                    attachment.isCopyReplace = true;
                                                    this.arrayOfSelectedFiles.push(attachment);
                                                    this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                                } else {
                                                    this.flagForhideShowUploadingFiles = true;
                                                    this.togglemore = true;
                                                    attachment.isCopyReplace = false;
                                                    this.arrayOfSelectedFiles.push(attachment);
                                                    // this.arrayOfSelectedFiles = [...this.arrayOfSelectedFiles];
                                                    // console.log(this.arrayOfSelectedFiles);
                                                    this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                                    const key = 'origin/assets/' + relativePath;
                                                    this.uploadFile(attachment, key, this.arrayOfSelectedFiles.findIndex(val => val.key === 'origin/assets/' + relativePath));
                                                }
                                            });
                                        } else {
                                            console.log('File Size Error');
                                            const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                                            // console.log(index);
                                            files.splice(index, 1);
                                            this.flagForDuplicateFileMsg = true;
                                        }
                                    });
                                } else {
                                    console.log('invalid file');
                                    const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                                    files.splice(index, 1);
                                    // this.flagForShowErrorMsg = true;
                                }
                            } else {
                                // It was a directory (empty directories are added, otherwise only files)
                                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                                // console.log(droppedFile.relativePath, fileEntry);
                            }
                        }
                        // console.log('called');
                    } else {
                        // this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                        //   positionClass: 'toast-top-right',
                        //   closeButton: true
                        // });
                        this.openModal('warningModal');
                    }
                } else {
                    this.openModal('warningModal');
                }
            } else {
                const folderUrl = '/' + this.keyForFolderName;
                console.log(folderUrl);
                const index3 = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                console.log(index3);
                if (index3 !== -1) {
                    if (this.arrayOfPermissionForAssets[index3].isCreate === true) {
                        // this.errorMsgArray = new Array<{ errormsg: string }>();
                        if (!this.isNullUndefinedOrBlank(assets)) {
                            this.openFolder(assets, 'created_at.desc');
                        }
                        for (const droppedFile of files) {
                            console.log(droppedFile);
                            // Is it a file?
                            if (droppedFile.fileEntry.isFile) {
                                const ext = droppedFile.relativePath.split('.').pop();
                                const ext1 = (ext).toLowerCase();
                                if (ext1) {
                                    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                                    console.log(fileEntry);
                                    fileEntry.file(async (file: File) => {
                                        const flagForDuplicateFile = false;
                                        const totalFileSize = 0;
                                        // if (!this.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
                                        //   console.log(this.arrayOfSelectedFiles);
                                        //   const flag1 = this.arrayOfSelectedFiles.filter(val => {
                                        //     console.log(typeof val.asset_size);
                                        //     totalFileSize += val.asset_size;
                                        //     if (val.file.name === file.name) {
                                        //       console.log('match');
                                        //       flagForDuplicateFile = true;
                                        //       // const errorMsg = { errormsg: file.name + 'is already uploaded.' };
                                        //       this.errorMsgArray.push({ errormsg: '"' + file.name + '"' + ' ' + ' is already uploaded.' });
                                        //     }
                                        //   });
                                        // }
                                        // console.log(totalFileSize);
                                        if (!flagForDuplicateFile) {
                                            // if (totalFileSize + file.size <= fileSize) {
                                            let relativePath = (type === 'Files' ? droppedFile.relativePath : file['webkitRelativePath']);
                                            if (!this.isNullUndefinedOrBlank(folderDropedKey)) {
                                                // console.log(folderDropedKey);
                                                // console.log('Relative');
                                                relativePath = folderDropedKey + relativePath;
                                            }
                                            relativePath = relativePath.replace(/[^a-zA-Z0-9./]/g, '_');
                                            // console.log(relativePath);
                                            // console.log(type);
                                            const obj = this.checkFileExistOrNot('origin/assets/' + relativePath).then(val1 => {
                                                // Here you can access the real file
                                                // console.log(droppedFile.relativePath, file);
                                                const file1 = new Blob([file], { type: 'application/pdf' });
                                                const fileURL = URL.createObjectURL(file1);
                                                // console.log('fileLength: ' + files.length);
                                                const attachment = new Assets();
                                                attachment.key = 'origin/assets/' + relativePath;
                                                // attachment.documentName = fileURL;
                                                attachment.file = file;
                                                attachment.name = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
                                                attachment.asset_size = +file.size;
                                                attachment.progress = Number(0);
                                                attachment.file_type = file.type;
                                                // console.log(val1);
                                                if (val1 === 'Asset found') {
                                                    // this.openModal('copyOrReplaceAssetModal');
                                                    // console.log(attachment);
                                                    this.flagForhideShowUploadingFiles = true;
                                                    this.togglemore = true;
                                                    attachment.isCopyReplace = true;
                                                    this.arrayOfSelectedFiles.push(attachment);
                                                    this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                                } else {
                                                    this.flagForhideShowUploadingFiles = true;
                                                    this.togglemore = true;
                                                    attachment.isCopyReplace = false;
                                                    this.arrayOfSelectedFiles.push(attachment);
                                                    // this.arrayOfSelectedFiles = [...this.arrayOfSelectedFiles];
                                                    // console.log(this.arrayOfSelectedFiles);
                                                    this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
                                                    const key = 'origin/assets/' + relativePath;
                                                    this.uploadFile(attachment, key, this.arrayOfSelectedFiles.findIndex(val => val.key === 'origin/assets/' + relativePath));
                                                }
                                            });
                                        } else {
                                            console.log('File Size Error');
                                            const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                                            // console.log(index);
                                            files.splice(index, 1);
                                            this.flagForDuplicateFileMsg = true;
                                        }
                                    });
                                } else {
                                    console.log('invalid file');
                                    const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
                                    files.splice(index, 1);
                                    // this.flagForShowErrorMsg = true;
                                }
                            } else {
                                // It was a directory (empty directories are added, otherwise only files)
                                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                                // console.log(droppedFile.relativePath, fileEntry);
                            }
                        }
                        // console.log('called');
                    } else {
                        this.openModal('warningModal');
                    }
                } else {
                    this.openModal('warningModal');
                }
            }
        } else {
            this.openModal('warningModal');
            // // this.errorMsgArray = new Array<{ errormsg: string }>();
            // if (!this.isNullUndefinedOrBlank(assets)) {
            //   this.openFolder(assets, 'created_at.desc');
            // }
            // for (const droppedFile of files) {
            //   console.log(droppedFile);
            //   // Is it a file?
            //   if (droppedFile.fileEntry.isFile) {
            //     const ext = droppedFile.relativePath.split('.').pop();
            //     const ext1 = (ext).toLowerCase();
            //     if (ext1) {
            //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            //       console.log(fileEntry);
            //       fileEntry.file(async (file: File) => {
            //         const flagForDuplicateFile: boolean = false;
            //         const totalFileSize = 0;
            //         // if (!this.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
            //         //   console.log(this.arrayOfSelectedFiles);
            //         //   const flag1 = this.arrayOfSelectedFiles.filter(val => {
            //         //     console.log(typeof val.asset_size);
            //         //     totalFileSize += val.asset_size;
            //         //     if (val.file.name === file.name) {
            //         //       console.log('match');
            //         //       flagForDuplicateFile = true;
            //         //       // const errorMsg = { errormsg: file.name + 'is already uploaded.' };
            //         //       this.errorMsgArray.push({ errormsg: '"' + file.name + '"' + ' ' + ' is already uploaded.' });
            //         //     }
            //         //   });
            //         // }
            //         console.log(totalFileSize);
            //         if (!flagForDuplicateFile) {
            //           // if (totalFileSize + file.size <= fileSize) {
            //           let relativePath = (type === 'Files' ? droppedFile.relativePath : file['webkitRelativePath']);
            //           if (!this.isNullUndefinedOrBlank(folderDropedKey)) {
            //             console.log(folderDropedKey);
            //             console.log('Relative');
            //             relativePath = folderDropedKey + relativePath;
            //           }
            //           relativePath = relativePath.replace(/[^a-zA-Z0-9./]/g, '_');
            //           console.log(relativePath);
            //           console.log(type);
            //           const obj =  this.checkFileExistOrNot('origin/assets/' + relativePath).then(val1 => {
            //             // Here you can access the real file
            //             console.log(droppedFile.relativePath, file);
            //             const file1 = new Blob([file], { type: 'application/pdf' });
            //             const fileURL = URL.createObjectURL(file1);
            //             console.log('fileLength: ' + files.length);
            //             const attachment = new Assets();
            //             attachment.key = 'origin/assets/' + relativePath;
            //             // attachment.documentName = fileURL;
            //             attachment.file = file;
            //             attachment.name = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
            //             attachment.asset_size = +file.size;
            //             attachment.progress = Number(0);
            //             attachment.file_type = file.type;
            //             console.log(val1);
            //             if (val1 === 'Asset found') {
            //               // this.openModal('copyOrReplaceAssetModal');
            //               console.log(attachment);
            //               this.flagForhideShowUploadingFiles = true;
            //               this.togglemore = true;
            //               attachment.isCopyReplace = true;
            //               this.arrayOfSelectedFiles.push(attachment);
            //               this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
            //             } else {
            //               this.flagForhideShowUploadingFiles = true;
            //               this.togglemore = true;
            //               attachment.isCopyReplace = false;
            //               this.arrayOfSelectedFiles.push(attachment);
            //               // this.arrayOfSelectedFiles = [...this.arrayOfSelectedFiles];
            //               // console.log(this.arrayOfSelectedFiles);
            //               this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
            //               const key = 'origin/assets/' + relativePath;
            //               this.uploadFile(attachment, key, this.arrayOfSelectedFiles.findIndex(val => val.key === 'origin/assets/' + relativePath));
            //             }
            //           });
            //         } else {
            //           console.log('File Size Error');
            //           const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
            //           console.log(index);
            //           files.splice(index, 1);
            //           this.flagForDuplicateFileMsg = true;
            //         }
            //       });
            //     } else {
            //       console.log('invalid file');
            //       const index = files.findIndex(val => val.fileEntry === droppedFile.fileEntry);
            //       files.splice(index, 1);
            //       // this.flagForShowErrorMsg = true;
            //     }
            //   } else {
            //     // It was a directory (empty directories are added, otherwise only files)
            //     const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            //     console.log(droppedFile.relativePath, fileEntry);
            //   }
            // }
            // console.log('called');
        }
    }

    public fileOver(event) {
        // console.log(event);
        console.log('event => ', event);
        // console.log('file Over');
        this.isFileDropzone = true;
    }

    public fileLeave(event) {
        // console.log(event);
        // console.log('file Leave');
        this.isFileDropzone = false;
    }

    copyOrReplaceAsset(value, file?: Assets, index?) {
        if (value === 'Copy') {
            file.isCopyReplace = false;
            file.key = file.key.replace(file.name, 'Copy_' + file.name);
            file.name = 'Copy_' + file.name;
            this.uploadFile(file, file.key, index);
        } else if (value === 'Replace') {
            file.isCopyReplace = false;
            file.replace = true;
            this.uploadFile(file, file.key, index);
        }
    }

    // uploadFile(assetObj: Assets, key, index) {
    //   const contentType = assetObj.file.type;
    //   this.uploadCompleteCount = this.arrayOfSelectedFiles.length;
    //   // console.log(this.arrayOfSelectedFiles[index].progress);
    //   this.arrayOfSelectedFiles.filter(val => {
    //     if (val.status === 'Success') {
    //       this.uploadCompleteCount -= 1;
    //     }
    //   });
    //   const bucket = new S3(
    //     {
    //       // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
    //       // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
    //       // region: 'sgp1', // for digital ocean spaces
    //       // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
    //       accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
    //       secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
    //       region: 'us-west-1', // for wasbi cloud
    //       endpoint: this.organizationObj.StorageEndpoint// for wasbi cloud
    //     }
    //   );
    //   AWS.config.httpOptions.timeout = 0;
    //   let uploadID: string;
    //   const params = {
    //     Bucket: this.organizationObj.BucketName,
    //     Key: key,
    //     // Body: assetObj.file,
    //     ACL: 'public-read',
    //     ContentType: contentType
    //   };
    //   bucket.createMultipartUpload(params, (err, data) => {
    //     if (err) {
    //       console.log(err, err.stack);  // an error occurred
    //     } else {
    //       uploadID = data.UploadId;
    //       this.arrayOfSelectedFiles[index].uploadId = uploadID;
    //       this.arrayOfSelectedFiles[index].key = key;
    //       this.arrayOfSelectedFiles[index].isCanceled = false;



    //       const paramsForUploadPart = {
    //         Bucket: this.organizationObj.BucketName,
    //         Key: key,
    //         Body: assetObj.file,
    //         // ACL: 'public-read',
    //         PartNumber: 1,
    //         // ContentType: contentType,
    //         UploadId: uploadID
    //       };

    //       const req = bucket.uploadPart(paramsForUploadPart).on('httpUploadProgress', (evt) => {
    //         // console.log(evt);

    //         this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
    //         // console.log(this.arrayOfSelectedFiles[index].progress);
    //         // this.arrayOfSelectedFiles = [...this.arrayOfSelectedFiles];
    //         // console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);

    //       }).send((err1, data1) => {
    //         if (err1) {
    //           if (err1.name !== 'NoSuchUpload') {

    //             assetObj.status = 'Failed';
    //             this.toasterService.error(err1.message, '', {
    //               positionClass: 'toast-top-right',
    //               closeButton: true
    //             });
    //             console.log('There was an error uploading your file: ', err1.message);
    //           }
    //           return false;
    //         }
    //         // this.uploadCompleteCount = this.arrayOfSelectedFiles.length - 1;
    //         return true;
    //       });
    //     }
    //   });
    // }

    abortUploading(uploadId, key, index) {
        const bucket = new S3(
            {
                // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
                // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
                // region: 'sgp1', // for digital ocean spaces
                // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
                accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
                secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
                region: 'us-west-1', // for wasbi cloud
                endpoint: this.organizationObj.StorageEndpoint// for wasbi cloud
            }
        );
        const params = {
            Bucket: this.organizationObj.BucketName,
            Key: key,
            UploadId: uploadId
        };
        bucket.abortMultipartUpload(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);  // an error occurred
            } else {
                // this.uploadCompleteCount -= 1;
                this.arrayOfSelectedFiles[index].isCanceled = true;
                console.log(data);           // successful response
            }
        });
    }

    uploadFile(assetObj: Assets, key, index) {
        const contentType = assetObj.file.type;
        const bucket = new S3(
            {
                // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
                // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
                // region: 'sgp1', // for digital ocean spaces
                // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
                accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
                secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
                region: 'us-west-1', // for wasbi cloud
                endpoint: this.organizationObj.StorageEndpoint// for wasbi cloud
            }
        );
        AWS.config.httpOptions.timeout = 0;
        // const params = new AWS.S3.ManagedUpload({
        //   params: {
        //     Bucket: this.organizationObj.BucketName,
        //     Key: key,
        //     Body: assetObj.file,
        //     ACL: 'public-read',
        //     ContentType: contentType
        //   }
        // });
        const params = {
            Bucket: this.organizationObj.BucketName,
            Key: key,
            Body: assetObj.file,
            ACL: 'public-read',
            ContentType: contentType
        };
        // setTimeout(params.abort.bind(req), 1000);
        const req = bucket.upload(params).on('httpUploadProgress', (evt) => {
            this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
        }).send((err, data) => {
            if (err) {
                assetObj.status = 'Failed';
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            assetObj.status = 'Success';
            // this.uploadCompleteCount = this.arrayOfSelectedFiles.length - 1;
            this.createAssetAPI(data, assetObj);
            return true;
        });
    }

    clickMe() {
        // this.viewHeight = this.elementView.nativeElement.offsetHeight;
        const test1 = document.getElementById('test').scrollHeight;
        if (!this.isNullUndefinedOrBlank(test1)) {
            this.scroll = test1;
        }
    }

    searchAssets(searchParam: string, tags) {
        const formData = new FormData();
        // console.log(searchParam);
        // console.log(tags);
        if (!this.isNullUndefinedOrBlank(searchParam)) {
            formData.set('search_query', searchParam);
        }
        if (!this.isNullUndefinedOrBlank(tags)) {
            formData.set('tag_name', tags);
        }
        this.searchNgModel = tags;
        this.arrayOfSearchedTags = tags;
        this.mainSearchNgModel = searchParam;
        this.allAssets = new Array<Assets>();
        this.arrayOfBreadCrumb = new Array<{ 'asset_id': number, 'folder_name': string, 'isActive': boolean }>();
        this.isBreadCrumb = false;
        this.flagForHideShowBackButton = false;
        this.scroll = 0;
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        this.postMethodAPI(false, this.serverVariableService.searchAssetsAPI, formData, (response) => {
            if (!this.isNullUndefinedOrBlank(response)) {
                this.allAssets = Deserialize(response, Assets);
                this.isSearch = true;
                const indexForRootFolder = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
                if (indexForRootFolder !== -1) {
                    this.allAssets.filter(val => {

                        if (val.file_type === 'folder') {
                            val.isPermission = true;
                        } else {
                            val.isPermission = false;
                        }
                    });
                } else {
                    this.allAssets.filter(val => {
                        const index = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === ('/' + val.name));
                        // console.log(index);
                        if (val.file_type === 'folder' && index !== -1) {
                            val.isPermission = true;
                        } else {
                            val.isPermission = false;
                        }
                    });
                }
                if (!this.isEmptyObjectOrNullUndefiend(tags)) {
                    localStorage.removeItem('search-param');
                    localStorage.setItem('search-tags-param', JSON.stringify(tags));
                }
                if (!this.isNullUndefinedOrBlank(searchParam)) {
                    localStorage.removeItem('search-tags-param');
                    localStorage.setItem('search-param', searchParam);
                }
                this.redirectTo('/admin/work_area/assets/search-assets/search');
            }
        }, false, undefined, '/admin/work_area/assets/search-assets/search');
    }

    createAssetAPI(uploadResponse, document: Assets) {
        this.closeAfterSelection();
        let assetObj = new Assets();
        assetObj = document;
        const splitArray = assetObj.name.split('.');
        const extension = splitArray[splitArray.length - 1].toLowerCase();
        switch (extension) {
            case EnumforExtension.JPG: {
                assetObj.file_type = 'image/jpg';
                break;
            }
            case EnumforExtension.JPEG: {
                assetObj.file_type = 'image/jpeg';
                break;
            }
            case EnumforExtension.ZIP: {
                assetObj.file_type = 'application/zip';
                break;
            }
            case EnumforExtension.RAR: {
                assetObj.file_type = 'application/rar';
                break;
            }
            case EnumforExtension.DOC: {
                assetObj.file_type = 'application/msword';

                break;
            }
            case EnumforExtension.DOCX: {
                assetObj.file_type = 'application/docx';
                break;
            }
            case EnumforExtension.XLS: {
                assetObj.file_type = 'application/excel';
                break;
            }
            case EnumforExtension.XLSX: {
                assetObj.file_type = 'application/xlsx';
                break;
            }
            case EnumforExtension.TXT: {
                assetObj.file_type = 'text/plain';
                break;
            }
            case EnumforExtension.ISO: {
                assetObj.file_type = 'application/iso';
                break;
            }
            case EnumforExtension.MP3: {
                assetObj.file_type = 'audio/mpeg3';
                break;
            }
            case EnumforExtension.MP4: {
                assetObj.file_type = 'video/mp4';
                break;
            }
            case EnumforExtension.TARGZ: {
                assetObj.file_type = 'application/targz';
                break;
            }
            case EnumforExtension.ZZIP: {
                assetObj.file_type = 'application/zzip';
                break;
            }
            case EnumforExtension.LOG: {
                assetObj.file_type = 'application/log';
                break;
            }
            case EnumforExtension.SEVENZIP: {
                assetObj.file_type = 'application/7zip';
                break;
            }
            case EnumforExtension.AIFF: {
                assetObj.file_type = 'audio/aiff';
                break;
            }
            case EnumforExtension.ARJ: {
                assetObj.file_type = 'application/arj';
                break;
            }
            case EnumforExtension.BIN: {
                assetObj.file_type = 'application/x-binary';
                break;
            }
            case EnumforExtension.CSV: {
                assetObj.file_type = 'application/csv';
                break;
            }
            case EnumforExtension.DAT: {
                assetObj.file_type = 'zz-application/zz-winassoc-dat';
                break;
            }
            case EnumforExtension.DB: {
                assetObj.file_type = 'application/vnd.sqlite3';
                break;
            }
            case EnumforExtension.DEB: {
                assetObj.file_type = 'application/x-debian-package';
                break;
            }
            case EnumforExtension.DMG: {
                assetObj.file_type = 'application/dmg';
                break;
            }
            case EnumforExtension.MDB: {
                assetObj.file_type = 'application/dmg';
                break;
            }
            case EnumforExtension.PKG: {
                assetObj.file_type = 'application/x-newton-compatible-pkg';
                break;
            }
            case EnumforExtension.TOAST: {
                assetObj.file_type = 'application/x-roxio-toast';
                break;
            }
            case EnumforExtension.VCD: {
                assetObj.file_type = 'application/x-cdlink';
                break;
            }
            case EnumforExtension.WAV: {
                assetObj.file_type = 'audio/wav';
                break;
            }
            case EnumforExtension.WMA: {
                assetObj.file_type = 'audio/x-ms-wma';
                break;
            }
            case EnumforExtension.WPL: {
                assetObj.file_type = 'application/vnd.ms-wpl';
                break;
            }
            case EnumforExtension.PDF: {
                assetObj.file_type = 'application/pdf';
                break;
            }
            case EnumforExtension.PNG: {
                assetObj.file_type = 'image/png';
                break;
            }
            case EnumforExtension.AI: {
                assetObj.file_type = 'application/postscript';
                break;
            }
            case EnumforExtension.FOLDER: {
                assetObj.file_type = 'folder';
                break;
            }
            case EnumforExtension.THREEGTWO: {
                assetObj.file_type = 'video/3g2';
                break;
            }
            case EnumforExtension.THREEGP: {
                assetObj.file_type = 'video/3gp';
                break;
            }
            case EnumforExtension.AIF: {
                assetObj.file_type = 'audio/aiff';
                break;
            }
            case EnumforExtension.APK: {
                assetObj.file_type = 'application/vnd.android.package-archive';
                break;
            }
            case EnumforExtension.ASP: {
                assetObj.file_type = 'text/asp';
                break;
            }
            case EnumforExtension.ASPX: {
                assetObj.file_type = 'text/aspx';
                break;
            }
            case EnumforExtension.AVI: {
                assetObj.file_type = 'video/avi';
                break;
            }
            case EnumforExtension.BAK: {
                assetObj.file_type = 'application/x-trash';
                break;
            }
            case EnumforExtension.BAT: {
                assetObj.file_type = 'application/x-bat';
                break;
            }
            case EnumforExtension.BMP: {
                assetObj.file_type = 'image/bmp';
                break;
            }
            case EnumforExtension.C: {
                assetObj.file_type = 'text/x-c';
                break;
            }
            case EnumforExtension.CAB: {
                assetObj.file_type = 'application/vnd.ms-cab-compressed';
                break;
            }
            case EnumforExtension.CDA: {
                assetObj.file_type = 'application/x-cdf';
                break;
            }
            case EnumforExtension.CDR: {
                assetObj.file_type = 'image/x-coreldraw';
                break;
            }
            case EnumforExtension.CER: {
                assetObj.file_type = 'application/pkix-cert';
                break;
            }
            case EnumforExtension.CFG: {
                assetObj.file_type = 'application/xhtml+xml';
                break;
            }
            case EnumforExtension.CFM: {
                assetObj.file_type = 'application/x-cfm';
                break;
            }
            case EnumforExtension.CGI: {
                assetObj.file_type = 'application/x-httpd-cgi';
                break;
            }
            case EnumforExtension.CLASS: {
                assetObj.file_type = 'application/x-httpd-java';
                break;
            }
            case EnumforExtension.COM: {
                assetObj.file_type = 'application/x-msdos-program';
                break;
            }
            case EnumforExtension.CPL: {
                assetObj.file_type = 'application/cpl+xml';
                break;
            }
            case EnumforExtension.CPP: {
                assetObj.file_type = 'text/x-c++src';
                break;
            }
            case EnumforExtension.CS: {
                assetObj.file_type = 'application/x-cs';
                break;
            }
            case EnumforExtension.CSS: {
                assetObj.file_type = 'text/css';
                break;
            }
            case EnumforExtension.CUR: {
                assetObj.file_type = 'application/x-win-bitmapder';
                break;
            }
            case EnumforExtension.DLL: {
                assetObj.file_type = 'application/x-msdownload';
                break;
            }
            case EnumforExtension.DMP: {
                assetObj.file_type = 'application/x-dmp';
                break;
            }
            case EnumforExtension.EMAIL: {
                assetObj.file_type = 'application/x-email';
                break;
            }
            case EnumforExtension.EML: {
                assetObj.file_type = 'message/rfc822';
                break;
            }
            case EnumforExtension.EMLX: {
                assetObj.file_type = 'text/x-emlx';
                break;
            }
            case EnumforExtension.EPS: {
                assetObj.file_type = 'application/x-postscript';
                break;
            }
            case EnumforExtension.EXE: {
                assetObj.file_type = 'application/octet-stream';
                break;
            }
            case EnumforExtension.FILE: {
                assetObj.file_type = 'file/x-win';
                break;
            }
            case EnumforExtension.FLV: {
                assetObj.file_type = 'video/x-flv';
                break;
            }
            case EnumforExtension.FNT: {
                assetObj.file_type = 'application/x-font-opentype';
                break;
            }
            case EnumforExtension.FON: {
                assetObj.file_type = 'application/x-font';
                break;
            }
            case EnumforExtension.GADGET: {
                assetObj.file_type = 'application/x-windows-gadget';
                break;
            }
            case EnumforExtension.GIF: {
                assetObj.file_type = 'image/gif';
                break;
            }
            case EnumforExtension.H: {
                assetObj.file_type = 'text/x-h';
                break;
            }
            case EnumforExtension.HTML: {
                assetObj.file_type = 'text/html';
                break;
            }
            case EnumforExtension.ICNS: {
                assetObj.file_type = 'application/icon-mac';
                break;
            }
            case EnumforExtension.ICO: {
                assetObj.file_type = 'image/x-icon';
                break;
            }
            case EnumforExtension.INI: {
                assetObj.file_type = 'application/textedit';
                break;
            }
            case EnumforExtension.JAR: {
                assetObj.file_type = 'application/java-archive';
                break;
            }
            case EnumforExtension.JAVA: {
                assetObj.file_type = 'application/ms-java';
                break;
            }
            case EnumforExtension.JS: {
                assetObj.file_type = 'application/x-javascript';
                break;
            }
            case EnumforExtension.JSP: {
                assetObj.file_type = 'application/x-jsp';
                break;
            }
            case EnumforExtension.KEY: {
                assetObj.file_type = 'application/keynote';
                break;
            }
            case EnumforExtension.LNK: {
                assetObj.file_type = 'application/x-ms-shortcut';
                break;
            }

            case EnumforExtension.M4v: {
                assetObj.file_type = 'video/x-m4v';
                break;
            }
            case EnumforExtension.MID: {
                assetObj.file_type = 'audio/mid';
                break;
            }
            case EnumforExtension.MIDI: {
                assetObj.file_type = 'audio/midi';
                break;
            }
            case EnumforExtension.MKV: {
                assetObj.file_type = 'video/x-matroska';
                break;
            }
            case EnumforExtension.MOV: {
                assetObj.file_type = 'video/quicktime';
                break;
            }
            case EnumforExtension.MPA: {
                assetObj.file_type = 'audio/mpeg';
                break;
            }
            case EnumforExtension.MPEG: {
                assetObj.file_type = 'video/mpeg';
                break;
            }
            case EnumforExtension.MSG: {
                assetObj.file_type = 'application/vnd.ms-outlook';
                break;
            }
            case EnumforExtension.MSI: {
                assetObj.file_type = 'application/x-msi';
                break;
            }
            case EnumforExtension.ODP: {
                assetObj.file_type = 'application/vnd.oasis.opendocument.presentation';
                break;
            }
            case EnumforExtension.ODS: {
                assetObj.file_type = 'application/vnd.oasis.opendocument.spreadsheet';
                break;
            }
            case EnumforExtension.OFT: {
                assetObj.file_type = 'application/x-oft';
                break;
            }
            case EnumforExtension.OGG: {
                assetObj.file_type = 'application/ogg';
                break;
            }
            case EnumforExtension.OST: {
                assetObj.file_type = 'application/x-ost';
                break;
            }

            case EnumforExtension.PHP: {
                assetObj.file_type = 'application/x-php';
                break;
            }
            case EnumforExtension.PL: {
                assetObj.file_type = 'application/x-perl';
                break;
            }
            case EnumforExtension.PPS: {
                assetObj.file_type = 'application/vnd.ms-powerpoint';
                break;
            }
            case EnumforExtension.PPT: {
                assetObj.file_type = 'application/ms-powerpoint';
                break;
            }
            case EnumforExtension.PPTX: {
                assetObj.file_type = 'application/x-pptx';
                break;
            }
            case EnumforExtension.PS: {
                assetObj.file_type = 'application/x-postscript';
                break;
            }
            case EnumforExtension.PSB: {
                assetObj.file_type = 'application/x-psb';
                break;
            }
            case EnumforExtension.PSD: {
                assetObj.file_type = 'application/x-photoshop';
                break;
            }
            case EnumforExtension.PST: {
                assetObj.file_type = 'application/x-pst';
                break;
            }
            case EnumforExtension.PY: {
                assetObj.file_type = 'application/x-python-code';
                break;
            }
            case EnumforExtension.RAW: {
                assetObj.file_type = 'image/x-panasonic-raw';
                break;
            }
            case EnumforExtension.RM: {
                assetObj.file_type = 'application/vnd.rn-realmedia';
                break;
            }
            case EnumforExtension.RSS: {
                assetObj.file_type = 'application/rss+xml';
                break;
            }
            case EnumforExtension.SAV: {
                assetObj.file_type = 'application/x-spss-sav';
                break;
            }
            case EnumforExtension.SH: {
                assetObj.file_type = 'application/x-sh';
                break;
            }
            case EnumforExtension.SQL: {
                assetObj.file_type = 'application/sql';
                break;
            }
            case EnumforExtension.SVG: {
                assetObj.file_type = 'image/svg+xml';
                break;
            }
            case EnumforExtension.SWF: {
                assetObj.file_type = 'application/x-shockwave-flash';
                break;
            }
            case EnumforExtension.SWIFT: {
                assetObj.file_type = 'application/x-swift';
                break;
            }
            case EnumforExtension.SYS: {
                assetObj.file_type = 'application/x-sys';
                break;
            }
            case EnumforExtension.TAR: {
                assetObj.file_type = 'application/tar';
                break;
            }
            case EnumforExtension.TIFF: {
                assetObj.file_type = 'image/tiff';
                break;
            }
            case EnumforExtension.TMP: {
                assetObj.file_type = 'application/x-tmp';
                break;
            }
            case EnumforExtension.TTF: {
                assetObj.file_type = 'application/x-font-ttf';
                break;
            }
            case EnumforExtension.VB: {
                assetObj.file_type = 'application/x-visual-basic';
                break;
            }
            case EnumforExtension.VCF: {
                assetObj.file_type = 'text/x-vcard';
                break;
            }
            case EnumforExtension.VOB: {
                assetObj.file_type = 'video/dvd video/mpeg';
                break;
            }
            case EnumforExtension.WSF: {
                assetObj.file_type = 'text/xml';
                break;
            }
            case EnumforExtension.XHTML: {
                assetObj.file_type = 'application/xhtml+xml';
                break;
            }
            case EnumforExtension.XLSM: {
                assetObj.file_type = 'application/vnd.ms-excel.sheet.macroEnabled.12';
                break;
            }
            case EnumforExtension.XML: {
                assetObj.file_type = 'application/xml';
                break;
            }
            case EnumforExtension.XML: {
                assetObj.file_type = 'application/xml';
                break;
            }
            case EnumforExtension.JSON: {
                assetObj.file_type = 'application/json';
                break;
            }
            case EnumforExtension.RTF: {
                assetObj.file_type = 'application/rtf';
                break;
            }
            case EnumforExtension.WPD: {
                assetObj.file_type = 'application/wordperfect';
                break;
            }
            case EnumforExtension.ODT: {
                assetObj.file_type = 'application/odt';
                break;
            }
            case EnumforExtension.RPM: {
                assetObj.file_type = 'application/x-rpm';
                break;
            }
            case EnumforExtension.TEX: {
                assetObj.file_type = 'application/x-tex';
                break;
            }
            default:
                break;
        }
        assetObj.key = uploadResponse.Key;
        assetObj.version_key = uploadResponse.VersionId;
        const formData = new FormData();
        const obj = Serialize(assetObj, Assets);
        formData.set('asset_data', JSON.stringify(obj));
        formData.set('parent_id', this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete.toString() : '0');
        this.postMethodAPI(true, this.serverVariableService.createAssetsAPI, formData, (response) => {
            if (!this.isNullUndefinedOrBlank(response)) {
                this.flagForRefreshPage += 1;
                if (this.flagForRefreshPage === this.arrayOfSelectedFiles.length) {
                    this.refreshAssets();
                }
            }
        });
        // this.closeAfterSelection();
    }

    refreshAssets() {
        this.offsetCount = 0;
        // console.log(this.assetIdForGetFolderAssetsOnDelete);
        // console.log(this.statusOfAction);
        // console.log(this.mainSearchNgModel);
        // console.log(this.searchNgModel);
        this.arrayOfSelectedAssets = new Array<number>();
        if (!this.isNullUndefinedOrBlank(this.statusOfAction)) {
            if (!this.isNullUndefinedOrBlank(this.assetIdForGetFolderAssetsOnDelete) && this.assetIdForGetFolderAssetsOnDelete > 0) {
                this.scroll = 0;
                this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.asc' : '.desc')));
                setTimeout(() => {
                    if (this.allAssets.length > 4) {
                        this.clickMe();
                    } else {
                        this.scroll = 600;
                    }
                }, 2000);
                this.offsetCount += 50;
            } else {
                if (!this.isNullUndefinedOrBlank(this.mainSearchNgModel)) {
                    const searchparams = localStorage.getItem('search-param');
                    this.mainSearchNgModel = searchparams;
                    this.searchAssets(searchparams, null);
                } else if (!this.isEmptyObjectOrNullUndefiend(this.searchNgModel)) {
                    const searchTagsparams = JSON.parse(localStorage.getItem('search-tags-param'));
                    this.searchNgModel = searchTagsparams;
                    this.searchAssets(null, searchTagsparams);
                }
            }
        } else {
            this.scroll = 0;
            // this.getAllAssets(0,0,'created_at.desc');
            this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, '0', (this.orderByForGridView + (this.reverseFlagForListView ? '.asc' : '.desc')));
            setTimeout(() => {
                if (this.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.scroll = 600;
                }
            }, 2000);
            this.offsetCount += 50;
        }
        this.hideShowUploadingFiles();
    }

    checkFileExistOrNot(key) {
        const formData = new FormData();
        formData.set('asset_key', key);
        formData.set('parent_id', this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete.toString() : '0');
        return new Promise((resolve, reject) => {
            this.postMethodAPI(true, this.serverVariableService.checkFileExistsAPI, formData, (response) => {
                if (!this.isNullUndefinedOrBlank(response)) {
                    // console.log(response);
                    resolve(response);
                } else {
                    reject('Error');
                }
            }, true);
        });
    }

    getOrganizationDetailsAPI() {
        const param = {};
        this.postMethodAPI(false, this.serverVariableService.getOrganizationDetailsAPI, param, (response) => {
            if (!this.isNullUndefinedOrBlank(response)) {
                this.organizationObj = Deserialize(response, Organization);
            }
        });
    }

    getAllAssets(idForFolder, offset, sortKey: string) {
        const formData = new FormData();
        formData.set('asset_id', idForFolder);
        formData.set('offset', offset);
        formData.set('sort_by', sortKey);
        if (!this.isNullUndefinedOrBlank(this.seletedFilType)) {
            formData.set('filter_type', this.seletedFilType);
        }
        if (!this.isNullUndefinedOrBlank(this.fromDate)) {
            formData.set('filter_from_date', this.datepipe.transform(this.fromDate, 'yyyy-MM-dd'));
        }
        if (!this.isNullUndefinedOrBlank(this.toDate)) {
            formData.set('filter_to_date', this.datepipe.transform(this.toDate, 'yyyy-MM-dd'));
        }
        this.allAssets = new Array<Assets>();
        this.postMethodAPI(false, this.serverVariableService.listAssetsAPI, formData, (response) => {
            if (!this.isEmptyObjectOrNullUndefiend(response)) {
                this.allAssets = Deserialize(response, Assets);
                // console.log(this.allPermissions);
                const indexForRootFolder = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/');
                if (idForFolder > 0) {
                    if (indexForRootFolder !== -1) {
                        this.allAssets.filter(val => {
                            val.isPermission = true;
                        });
                    } else {
                        this.allAssets.filter(val => {
                            if (!this.isNullUndefinedOrBlank(this.allPermissions) && this.allPermissions !== '/') {
                                const folderUrl = '/' + this.keyForFolderName + ('/' + val.name);
                                console.log('folderUrl', folderUrl);
                                const index = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                                console.log('index', index);
                                if (index !== -1 && val.asset_type === 'folder') {
                                    val['isFolderPermission'] = true;
                                }
                                val.isPermission = true;
                            } else {
                                // val.isPermission = false;
                                const folderUrl = '/' + this.keyForFolderName + ('/' + val.name);
                                console.log('folderUrl', folderUrl);
                                const index = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                                console.log(index);
                                if (index !== -1 && val.asset_type === 'folder') {
                                    val['isFolderPermission'] = true;
                                }
                                val.isPermission = true;
                            }
                        });
                    }
                } else {
                    if (indexForRootFolder !== -1) {
                        this.allAssets.filter(val => {
                            // if (val.file_type === 'folder') {
                            val.isPermission = true;
                            // } else {
                            //   val.isPermission = false;
                            // }
                        });
                    } else {
                        this.allAssets.filter(val => {
                            const index = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === ('/' + val.name));
                            // console.log(index);
                            val.isPermission = true;
                            // if (val.file_type === 'folder' && index !== -1) {
                            //   val.isPermission = true;
                            // } else {
                            //   val.isPermission = false;
                            // }
                        });
                    }
                }
            }
        });
    }

    setArrayPermssiontoAssets() {
        this.arrayOfPermissionForAssets = new Array<Permissions>();
        const pemissions = this.getLoginUsers().role.permission;
        // console.log(pemissions);
        const permissionObj = JSON.parse(pemissions);
        for (const key in permissionObj) {
            if (permissionObj.hasOwnProperty(key)) {
                // console.log(key);
                const perObj = new Permissions();
                perObj.name = key;
                if (key === '/') {
                    this.allPermissions = key;
                    localStorage.setItem('permission', this.allPermissions);
                }
                perObj.isCreate = false;
                perObj.isDelete = false;
                perObj.isRename = false;
                perObj.isVersion = false;
                perObj.isWorkFlow = false;
                // console.log(permissionObj[key]);
                // perObj.permission = Deserialize(this.setPermissionArray(permissionObj[key]), Permissions);
                const array: Array<string> = permissionObj[key];
                const obj1 = array.filter(val => {
                    switch (val) {
                        case EnumForPermissions.VIEW: {
                            perObj.isView = true;
                            break;
                        }
                        case EnumForPermissions.DELETE: {
                            perObj.isDelete = true;
                            break;
                        }
                        case EnumForPermissions.RENAME: {
                            perObj.isRename = true;
                            break;
                        }
                        case EnumForPermissions.CREATE: {
                            perObj.isCreate = true;
                            break;
                        }
                        case EnumForPermissions.VERSION: {
                            perObj.isVersion = true;
                            break;
                        }
                        case EnumForPermissions.WORKFLOW: {
                            perObj.isWorkFlow = true;
                            break;
                        }
                        default:
                            break;
                    }
                });
                this.arrayOfPermissionForAssets.push(perObj);
            }
        }
        // console.log(JSON.stringify(this.arrayOfPermissionForAssets));
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

    openFolder(obj: Assets, sort_key: string) {
        if (obj.asset_type === 'folder') {
            if (!this.isNullUndefinedOrBlank(this.arrayOfBreadCrumb)) {
                const newObj = this.arrayOfBreadCrumb.filter(val => {
                    val.isActive = false;
                });
            }
            this.arrayOfBreadCrumb.push({ 'asset_id': obj.id, 'folder_name': obj.name, 'isActive': true });
            this.isBreadCrumb = true;
            this.flagForHideShowBackButton = true;
            if (!this.isNullUndefinedOrBlank(this.keyForFolderName)) {
                this.keyForFolderName += ('/' + obj.name);
            } else {
                // this.rootFolder = '/' + obj.name;
                this.keyForFolderName = obj.name;
            }
            const index = this.arrayOfPermissionForAssets.findIndex(val => val.name === '/' + this.keyForFolderName);
            // console.log(index);

            if (this.allPermissions !== '/' && index !== -1) {

                this.allPermissions = '/' + this.keyForFolderName;
                localStorage.setItem('permission', this.allPermissions);
            } else {
                console.log('else');

                // if (this.arrayOfBreadCrumb.length > 1) {
                //   const key = this.keyForFolderName.split('/');
                //   const length = key.length - 2;
                //   const index1 = this.arrayOfPermissionForAssets.findIndex(val => val.name === '/' + key[length]);
                //   let finalKey;
                //   let permission;
                //   key.filter(val => {
                //     if (!this.isNullUndefinedOrBlank(finalKey)) {
                //       finalKey += '/' + val;
                //     } else {
                //       finalKey = '/' + val;
                //     }
                //     const index2 = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === '/' + finalKey);
                //     if (index2 !== -1) {
                //       permission = finalKey;
                //       console.log(key);
                //     }
                //   });
                //   console.log(key);
                //   console.log(index);
                // }
            }
            this.assetIdForGetFolderAssetsOnDelete = obj.id;
            localStorage.setItem('breadCrumbs', JSON.stringify(this.arrayOfBreadCrumb));
            localStorage.setItem('folderKey', JSON.stringify(this.keyForFolderName));
            this.scroll = 0;
            this.getAllAssets(obj.id, '0', sort_key);
            setTimeout(() => {
                if (this.allAssets.length > 4) {

                    this.clickMe();
                } else {
                    this.scroll = 600;

                }

            }, 2000);
        }
        // console.log(this.keyForFolderName);
    }

    redirectToAssetsDetails(idOfAssets, filetype, obj: Assets, sort_key: string) {
        if (filetype === 'folder') {

            if (!this.isNullUndefinedOrBlank(this.arrayOfBreadCrumb)) {
                const newObj = this.arrayOfBreadCrumb.filter(val => {
                    val.isActive = false;
                });
            }
            this.arrayOfBreadCrumb.push({ 'asset_id': obj.id, 'folder_name': obj.name, 'isActive': true });
            this.isBreadCrumb = true;


            this.flagForHideShowBackButton = true;
            if (!this.isNullUndefinedOrBlank(this.keyForFolderName)) {
                this.keyForFolderName += ('/' + obj.name);
            } else {
                this.keyForFolderName = obj.name;
            }
            const index = this.arrayOfPermissionForAssets.findIndex(val => val.name === '/' + this.keyForFolderName);
            if (this.allPermissions !== '/' && index !== -1) {
                this.allPermissions = '/' + this.keyForFolderName;
                localStorage.setItem('permission', this.allPermissions);
            }
            this.assetIdForGetFolderAssetsOnDelete = obj.id;
            localStorage.setItem('breadCrumbs', JSON.stringify(this.arrayOfBreadCrumb));
            localStorage.setItem('folderKey', JSON.stringify(this.keyForFolderName));
            this.scroll = 0;
            this.getAllAssets(idOfAssets, '0', sort_key);
            this.arrayOfSelectedAssets = new Array<number>();
            setTimeout(() => {
                if (this.allAssets.length > 4) {
                    this.clickMe();
                } else {
                    this.scroll = 600;
                }
            }, 2000);
        } else {
            if (!this.isNullUndefinedOrBlank(this.arrayOfBreadCrumb)) {
                this.keyForFolderName = this.keyForFolderName + '/' + obj.name;
                localStorage.setItem('folderKey', JSON.stringify(this.keyForFolderName));
            }
            this.redirectTo('/admin/work_area/assets/assets-details/' + idOfAssets);
        }
    }

    hideShowUploadingFiles() {
        this.flagForhideShowUploadingFiles = !this.flagForhideShowUploadingFiles;
    }

    applyCreateFolderValidations() {
        this.formForCreateFolder = this.formBuilder.group({
            'folder_name': ['', Validators.compose([Validators.required, Validators.pattern(this.validationService.PATTERN_FOR_USER_NAME_WITH_UNDERSCORE)])],
        });
    }

    createNewFolder(parentId, folderName) {
        const index2 = this.arrayOfPermissionForAssets.findIndex(val => val.name === '/');
        if (index2 !== -1) {
            if (this.arrayOfPermissionForAssets[index2].isCreate === true) {
                const formData = new FormData();
                folderName = folderName.replace(/[^a-zA-Z0-9]/g, '_');
                formData.set('parent_id', parentId);
                formData.set('folder_name', folderName);
                const orderBy = localStorage.getItem('orderBy');
                const sortBy = JSON.parse(localStorage.getItem('sortBy'));
                this.postMethodAPI(true, this.serverVariableService.createNewFolderAPI, formData, (response) => {
                    if (!this.isNullUndefinedOrBlank(response)) {
                        console.log('New Folder Created');
                        this.hideModal('createFolderModal');
                        this.offsetCount = 0;
                        this.scroll = 0;
                        this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, 0, (orderBy + (sortBy ? '.desc' : '.asc')));
                        setTimeout(() => {
                            if (this.allAssets.length > 4) {
                                this.clickMe();
                            } else {
                                this.scroll = 600;
                            }
                        }, 1500);
                    }
                });
            } else {
                this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                    positionClass: 'toast-top-right',
                    closeButton: true
                });
            }
        } else if (!this.isNullUndefinedOrBlank(this.allPermissions)) {
            const index1 = this.arrayOfPermissionForAssets.findIndex(val => val.name === this.allPermissions);
            console.log(index1);
            console.log(this.allPermissions);
            if (this.allPermissions === '/') {
                // tslint:disable-next-line:no-shadowed-variable
                const index2 = this.arrayOfPermissionForAssets.findIndex(val => val.name === this.allPermissions);
                if (this.arrayOfPermissionForAssets[index2].isCreate === true) {
                    const formData = new FormData();
                    folderName = folderName.replace(/[^a-zA-Z0-9]/g, '_');
                    formData.set('parent_id', parentId);
                    formData.set('folder_name', folderName);
                    const orderBy = localStorage.getItem('orderBy');
                    const sortBy = JSON.parse(localStorage.getItem('sortBy'));
                    this.postMethodAPI(true, this.serverVariableService.createNewFolderAPI, formData, (response) => {
                        if (!this.isNullUndefinedOrBlank(response)) {
                            console.log('New Folder Created');
                            this.hideModal('createFolderModal');
                            this.offsetCount = 0;
                            this.scroll = 0;
                            this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, 0, (orderBy + (sortBy ? '.desc' : '.asc')));
                            setTimeout(() => {
                                if (this.allAssets.length > 4) {
                                    this.clickMe();
                                } else {
                                    this.scroll = 600;
                                }
                            }, 1500);
                        }
                    });
                } else {
                    this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                        positionClass: 'toast-top-right',
                        closeButton: true
                    });
                }
            } else {
                const folderUrl = '/' + this.keyForFolderName;
                console.log(folderUrl);
                const index3 = this.arrayOfPermissionForAssets.findIndex(val1 => val1.name === folderUrl);
                console.log(index3);
                if (index3 !== -1) {
                    if (this.arrayOfPermissionForAssets[index3].isCreate === true) {
                        const formData = new FormData();
                        folderName = folderName.replace(/[^a-zA-Z0-9]/g, '_');
                        formData.set('parent_id', parentId);
                        formData.set('folder_name', folderName);
                        const orderBy = localStorage.getItem('orderBy');
                        const sortBy = JSON.parse(localStorage.getItem('sortBy'));
                        this.postMethodAPI(true, this.serverVariableService.createNewFolderAPI, formData, (response) => {
                            if (!this.isNullUndefinedOrBlank(response)) {
                                console.log('New Folder Created');
                                this.hideModal('createFolderModal');
                                this.offsetCount = 0;
                                this.scroll = 0;
                                this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, 0, (orderBy + (sortBy ? '.desc' : '.asc')));
                                setTimeout(() => {
                                    if (this.allAssets.length > 4) {
                                        this.clickMe();
                                    } else {
                                        this.scroll = 600;
                                    }
                                }, 1500);
                            }
                        });
                    } else {
                        this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                            positionClass: 'toast-top-right',
                            closeButton: true
                        });
                    }

                } else {
                    this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                        positionClass: 'toast-top-right',
                        closeButton: true
                    });
                }

            }

        } else {
            this.toasterService.error(this.serverVariableService.ERROR_MSG_WHEN_NO_ACCESS_ON_Upload, '', {
                positionClass: 'toast-top-right',
                closeButton: true
            });
            // const formData = new FormData();
            // formData.set('parent_id', parentId);
            // formData.set('folder_name', folderName);
            // const orderBy = localStorage.getItem('orderBy');
            // const sortBy = JSON.parse(localStorage.getItem('sortBy'));
            // this.postMethodAPI(true, this.serverVariableService.createNewFolderAPI, formData, (response) => {
            //   if (!this.isNullUndefinedOrBlank(response)) {
            //     console.log('New Folder Created');
            //     this.hideModal('createFolderModal');
            //     this.offsetCount = 0;
            //     this.scroll = 0;
            //     this.getAllAssets(this.assetIdForGetFolderAssetsOnDelete ? this.assetIdForGetFolderAssetsOnDelete : 0, this.offsetCount, (orderBy + (sortBy ? '.desc' : '.asc')));
            //     setTimeout(() => {
            //       if (this.allAssets.length > 4) {
            //         this.clickMe();
            //       } else {
            //         this.scroll = 600;
            //       }
            //     }, 1500);
            //   }
            // });
        }

    }

    getList() {
        if (!this.isNullUndefinedOrBlank(this.getLoginUsers())) {
            const param = {};
            this.postMethodAPI(false, this.serverVariableService.listTagsAPI, param, (response) => {
                if (!this.isNullUndefinedOrBlank(response)) {
                    this.arrayOfTags = Deserialize(response, Tags);
                }
            });
        }
    }

    closeAfterSelection() {
        if (this.flagAfterSelection === false) {
            this.flagAfterSelection = true;
        } else {
            this.flagAfterSelection = false;
        }
    }

    replaceSpecialCharacterWithUnderScore(folderName) {
        const foldername = folderName.replace(/[^a-zA-Z0-9]/g, '_');
        this.folderNameForCreateNewFolderAPI = foldername;
    }
}
