import { Component, OnInit } from '@angular/core';
import { createApiClient } from 'dots-wrapper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as moment from 'moment';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
// import S3 from 'aws-s3';
import { UtilsService } from '../../services/utils.service';
import { FileUploadArrayWithKey } from '../../models/File-Upload-Array-With-Key';
import { Documents } from '../../models/Documents';
import { Assets } from '../../models/Assets';
import { Serialize } from 'cerialize';


@Component({
  selector: 'app-demo-file-upload-cloud',
  templateUrl: './demo-file-upload-cloud.component.html',
  styleUrls: ['./demo-file-upload-cloud.component.css']
})
export class DemoFileUploadCloudComponent implements OnInit {
  selectedFiles: FileList;
  public files: NgxFileDropEntry[] = [];
  formData = new FormData();
  arrayOfSelectedFiles: Array<Assets> = new Array<Assets>();
  errorMsgArray = new Array<{ errormsg: string }>();
  flagForShowErrorMsg: boolean;
  flagForInvalidSizeMsg: boolean;
  flagForDuplicateFileMsg: boolean;

  constructor(public http: HttpClient, public utilsService: UtilsService) { }

  ngOnInit() {
    // this.getBuckcketContent();
  }



  getBuckcketContent() {

    // Input date as string
    const s = new Date().toISOString();
    // Reset time part
    // const m = moment(s).startOf('day');  // no UTC
    const m = moment.utc(s).startOf('day'); // UTC mode
    // Format using custom format
    // console.log(m.format('YYYYMMDD[T]HHmmss[Z]'));
    const BUCKET = 'kurate20dev';
    const APINAME = 'https://sgp1.digitaloceanspaces.com';
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer 6LFGSALG327SOVD2WLEV')
      .append('Content-Type', 'application/json')
      .append('Date', new Date().toUTCString())
      .append('X-Host-Override', 'sgp1.digitaloceanspaces.com')
      .append('X-amz-date', m.format('YYYYMMDD[T]HHmmss[Z]'))
      .append('x-amz-content-sha256', 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0')
      ;

    this.http.get(APINAME, { params: {}, headers: headers }).subscribe(response => {
      // console.log(response);

    });

  }

  public dropped(files: NgxFileDropEntry[]) {
console.log('in dropped file')
    const fileSize = 104857600;
    this.files = files;
    this.flagForShowErrorMsg = false;
    this.flagForInvalidSizeMsg = false;
    this.flagForDuplicateFileMsg = false;
    // this.errorMsgArray = new Array<{ errormsg: string }>();
    for (const droppedFile of files) {
      // console.log(droppedFile);
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const ext = droppedFile.relativePath.split('.').pop();
        const ext1 = (ext).toLowerCase();
        if (ext1) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          // console.log(fileEntry);
          fileEntry.file((file: File) => {
            let flagForDuplicateFile: boolean;
            let totalFileSize = 0;
            if (!this.utilsService.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
              // console.log(this.arrayOfSelectedFiles);
              const flag1 = this.arrayOfSelectedFiles.filter(val => {
                // console.log(typeof val.asset_size);
                totalFileSize += val.asset_size;
                if (val.file.name === file.name) {
                  // console.log('match');
                  flagForDuplicateFile = true;
                  // const errorMsg = { errormsg: file.name + 'is already uploaded.' };
                  this.errorMsgArray.push({ errormsg: '"' + file.name + '"' + ' ' + ' is already uploaded.' });
                }
              });
            }
            // console.log(totalFileSize);
            if (!flagForDuplicateFile) {
              // if (totalFileSize + file.size <= fileSize) {
              // Here you can access the real file
              const file1 = new Blob([file], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file1);
              // this.attchementUrl = fileURL;
              // const index = this.utilsService.isNullUndefinedOrBlank(this.arrayOfAttachments) ? '0' : this.arrayOfAttachments.length;
              // console.log('fileIndex: ' + index);
              // console.log('fileLength: ' + files.length);
              // console.log('arrayOfAttachmentLength: ' + this.arrayOfAttachments.length);
              // const fileName = String(index).concat(EnumForDocument.ATTACHMENT, '.', droppedFile.relativePath.split('.').pop());
              const fileName = file.name;
              // this.formData.append('document', file, fileName);
              const attachment = new Assets();
              attachment.key = droppedFile.relativePath;
              // attachment.documentName = fileURL;
              attachment.file = file;
              attachment.asset_size = +file.size;
              attachment.progress = Number(0);
              attachment.file_type = file.type;
              this.arrayOfSelectedFiles.push(attachment);
              // this.uploadFile(file, 'origin/assets/' + droppedFile.relativePath);
              // }
              // else {
              //   this.flagForInvalidSizeMsg = true;
              // }
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
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }


  uploadFiles() {
    if (!this.utilsService.isNullUndefinedOrBlank(this.arrayOfSelectedFiles)) {
      const obj1 = this.arrayOfSelectedFiles.filter((val, i) => {
        const key = 'origin/assets/' + val.key;
        // if (val.fileName.includes('/')) {
        //   var hierarchyKey;
        //   const arrayOfKey = val.fileName.split('/');
        //   console.log(arrayOfKey);
        //   const lenghtOfArray = arrayOfKey.length - 1;
        //   console.log(arrayOfKey.splice(arrayOfKey.length - 1, 1));

        //   arrayOfKey.filter((val1, index) => {
        //     if (index !== lenghtOfArray) {
        //       console.log(val1);
        //       if (index === 0) {
        //         hierarchyKey = val1;

        //       } else {
        //         hierarchyKey = hierarchyKey + '/' + val1;
        //         console.log(hierarchyKey);
        //       }
        //       this.uploadFolder(hierarchyKey);
        //     } else {
        //       this.uploadFile(val.file, key, i);
        //     }
        //   });


        // } else {

        // const key = 'origin/ku_skullbox/assets/' + val.fileName;
        this.checkFileExistOrNot(key);
        this.uploadFile(val, key, i);
        // }
      });
      // this.arrayOfSelectedFiles = new Array<Documents>();
      // this.utilsService.toasterService.success('File Upload Successfully...!!!', ' ', {
      //   positionClass: 'toast-top-right',
      //   closeButton: true
      // });
    }
  }

  deleteAttachement(index) {
    this.arrayOfSelectedFiles.splice(+index, 1);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFolder(key) {
    const bucket = new S3(
      {
        // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
        // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
        // region: 'sgp1', // for digital ocean spaces
        // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
        accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
        secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
        region: 'us-west-1', // for wasbi cloud
        endpoint: 'https://s3.us-west-1.wasabisys.com/' // for wasbi cloud
      }
    );
    AWS.config.httpOptions.timeout = 0;
    const params = {
      Bucket: 'skullboxdev',
      Key: key,
      Body: '',
      ACL: 'public-read',
      // ContentType: contentType
    };
    bucket.createMultipartUpload(params).on('httpUploadProgress', (evt) => {

      // this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
      // console.log(this.arrayOfSelectedFiles[index].progress);

      // console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);
    }).send(function (err, data) {
      if (err) {
        // console.log('There was an error uploading your file: ', err);
        return false;
      }
      // console.log('Successfully uploaded file.', data);
      return true;
    });
  }


  uploadMultipartFile(assetObj: Assets, key, index) {
    const contentType = assetObj.file.type;
    console.log(this.arrayOfSelectedFiles[index].progress);
    const bucket = new S3(
      {
        // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
        // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
        // region: 'sgp1', // for digital ocean spaces
        // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
        accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
        secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
        region: 'us-west-1', // for wasbi cloud
        endpoint: 'https://s3.us-west-1.wasabisys.com/' // for wasbi cloud
      }
    );
    AWS.config.httpOptions.timeout = 0;
    const params = {
      Bucket: 'skullboxdev',
      Key: key,
      Body: assetObj.file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.putObject(params).on('httpUploadProgress', (evt) => {

    //   this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
    //   console.log(this.arrayOfSelectedFiles[index].progress);

    //   console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);
    // }).send(function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    bucket.createMultipartUpload(params).on('httpUploadProgress', (evt) => {

      this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
      // console.log(this.arrayOfSelectedFiles[index].progress);

      // console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);
    }).send((err, data) => {
      if (err) {
        // console.log('There was an error uploading your file: ', err);
        return false;
      }
      // console.log('Successfully uploaded file.', data);
      this.createAssetAPI(data, assetObj);
      return true;
    });
  }
  uploadFile(assetObj: Assets, key, index) {
    const contentType = assetObj.file.type;
    console.log(this.arrayOfSelectedFiles[index].progress);
    const bucket = new S3(
      {
        // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
        // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
        // region: 'sgp1', // for digital ocean spaces
        // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
        accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
        secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
        region: 'us-west-1', // for wasbi cloud
        endpoint: 'https://s3.us-west-1.wasabisys.com/' // for wasbi cloud
      }
    );
    AWS.config.httpOptions.timeout = 0;
    const params = {
      Bucket: 'skullboxdev',
      Key: key,
      Body: assetObj.file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.putObject(params).on('httpUploadProgress', (evt) => {

    //   this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
    //   console.log(this.arrayOfSelectedFiles[index].progress);

    //   console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);
    // }).send(function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
    //   console.log('Successfully uploaded file.', data);
    //   return true;
    // });
    bucket.upload(params).on('httpUploadProgress', (evt) => {

      this.arrayOfSelectedFiles[index].progress = Math.round(evt.loaded / evt.total * 100);
      // console.log(this.arrayOfSelectedFiles[index].progress);

      console.log(`File uploaded: ${this.arrayOfSelectedFiles[index].progress}%`);
    }).send((err, data) => {
      if (err) {
        // console.log('There was an error uploading your file: ', err);
        return false;
      }
      // console.log('Successfully uploaded file.', data);
      this.createAssetAPI(data, assetObj);
      return true;
    });

    //   const config = {
    //     bucketName: 'kurate20dev',
    //     dirName: 'photos', /* optional */
    //     region: 'sgp1',
    //     accessKeyId: '6LFGSALG327SOVD2WLEV',
    //     secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',
    //     s3Url: 'https://sgp1.digitaloceanspaces.com/', /* optional */
    //   };

    //   const S3Client = new S3(config);
    //   /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

    //   /* This is optional */
    //   const newFileName = 'my-awesome-file';

    //   S3Client
    //     .uploadFile(file, newFileName)
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));

    //   /**
    //    * {
    //    *   Response: {
    //    *     bucket: "your-bucket-name",
    //    *     key: "photos/image.jpg",
    //    *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
    //    *   }
    //    * }
    //    */
    // // });
  }

  createAssetAPI(uploadResponse, document: Assets) {
    console.log('First');
    let assetObj = new Assets();
    assetObj = document;
    assetObj.key = uploadResponse.Key;
    assetObj.version_key = uploadResponse.VersionId;
    const formData = new FormData();
    const obj = Serialize(assetObj, Assets);
    // for (const key in obj) {
    //   if (obj.hasOwnProperty(key)) {
    //     formData.set(key, obj[key]);
    //   }
    // }
    formData.set('asset_data', JSON.stringify(obj));
    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.createAssetsAPI, formData, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        // console.log('File Saved SuccessFully');
      }
    });
  }


  checkFileExistOrNot(key) {
    const s3 = new S3(
      {
        // accessKeyId: '6LFGSALG327SOVD2WLEV', // for digital ocean spaces
        // secretAccessKey: 'ucV0vcCgFLizC45JflTcj/pK4cR9R95T5CGByw227h0',// for digital ocean spaces
        // region: 'sgp1', // for digital ocean spaces
        // endpoint: 'https://sgp1.digitaloceanspaces.com/' // for digital ocean spaces
        accessKeyId: '2KTN0HF80BPED2X3XU0M', // for wasbi cloud
        secretAccessKey: 'aHXQB6yLiRwqNA1sl2Iau2IIumqse1LjmICKAMIP', // for wasbi cloud
        region: 'us-west-1', // for wasbi cloud
        endpoint: 'https://s3.us-west-1.wasabisys.com/' // for wasbi cloud
      }
    );
    const params = { Bucket: 'skullboxdev', Key: key };
    s3.headObject(params).on('success', function (response) {
      // console.log("Key was", response);
    }).on('error', function (error) {
      // console.log(error);

      // error return a object with status code 404
    }).send();
  }

}
