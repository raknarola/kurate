import { UtilsService } from '../../../services/utils.service';
import { Assets } from '../../../models/Assets';
import { Deserialize } from 'cerialize';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecycleBinService {
  orderBy: string;
  reverseFlag: boolean;
  value: boolean;
  assetIdForDelete: number;
  allAssets: Array<Assets> = new Array<Assets>();
  flagForBackButton: boolean;
  idOfAssetTORestore: number;
  caseInsensitive: boolean;
  assetIdForGetFolderAssets: number;
  arrayForSortingKeys: any;
  arrayOfSelectedAssets = new Array<number>();
  constructor(public utilsService: UtilsService) {
    this.value = false;
    this.flagForBackButton = false;
    this.orderBy = 'created_at';
    this.reverseFlag = true;
    this.caseInsensitive = true;
    localStorage.removeItem('isSearched');
    localStorage.removeItem('breadCrumbs');
    localStorage.removeItem('folderKey');
    localStorage.removeItem('search-param');
    localStorage.removeItem('search-tags-param');
    localStorage.removeItem('assetView');
    localStorage.removeItem('orderBy');
    localStorage.removeItem('sortBy');
    this.utilsService.flagForHideShowSearchInput = false;
    this.arrayForSortingKeys = [{ key: 'name', value: 'File Name' }, { key: 'created_at', value: 'Created Date' }, { key: 'updated_at', value: 'Modified Date' }];

  }


  selectAllAssets() {
    if (this.value === true) {
      this.arrayOfSelectedAssets = new Array<number>();
    }
    const obj = this.allAssets.filter((val, index) => {
      if (this.value === true) {
        val['isSelected'] = true;
        this.arrayOfSelectedAssets.push(val.id);
      } else {
        val['isSelected'] = false;
        this.arrayOfSelectedAssets.splice(index, 1);
      }
    });
    if (this.value === false) {
      this.arrayOfSelectedAssets = new Array<number>();
    }
    // console.log(this.arrayOfSelectedAssets);
    // console.log(this.arrayOfSelectedAssets.length);
    // console.log(this.allAssets.length);

  }

  selectUnselectAsset(assetId: number, index, value) {
    // console.log(assetId);
    // console.log(index);
    // console.log(this.arrayOfSelectedAssets);
    // console.log(this.allAssets);
    // console.log(value);

    const assetIndex = this.allAssets.findIndex(val => val.id === assetId);


    if (value === true) {
      // this.allAssets[assetIndex]['isSelected'] = true;
      this.arrayOfSelectedAssets.push(assetId);
      // console.log('push');

      // console.log(this.arrayOfSelectedAssets);
      // console.log('push');

    } else if (value === false) {
      // this.allAssets[assetIndex]['isSelected'] = false;
      const assetIndex1 = this.arrayOfSelectedAssets.findIndex(val => val === assetId);
      console.log(assetIndex1);

      this.arrayOfSelectedAssets.splice(assetIndex1, 1);
      // console.log('pop');
      // console.log(this.arrayOfSelectedAssets);

      // console.log('pop');

    }
  }

  openDeleteAllAssets() {
    this.assetIdForDelete = undefined;

    this.utilsService.openModal('deleteAllAssetModal');
  }

  getRecycleBinData(asset_id) {
    const formData = new FormData();
    formData.set('asset_id', asset_id);
    this.allAssets = new Array<Assets>();
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.viewRecycleBinAPI, formData, (response, isResponseOnPage) => {
      if (!isResponseOnPage) {
        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          this.allAssets = Deserialize(response, Assets);
          const obj = this.allAssets.filter(val => {
            val['isSelected'] = false;
          });
        }
      } else {
        console.log('messageRemoved');
      }
    }, false, undefined, undefined, true, true);
  }

  getFileExtension(fileName) {
    const splifileName = fileName.split('.');
    const splitArrayLength = splifileName.length - 1;
    const extension = splifileName[splitArrayLength];
    return extension;

  }
  sortBy(key) {

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
  BackToAllDeletedAssets() {
    this.flagForBackButton = false;
    this.assetIdForGetFolderAssets = undefined;
    this.getRecycleBinData(0);

  }
  openDeleteAssetModal(id) {
    this.assetIdForDelete = id;
    this.utilsService.openModal('deleteAssetModal');
  }
  openFolder(assetId, fileType) {

    if (fileType === 'folder') {

      this.assetIdForGetFolderAssets = assetId;
      this.flagForBackButton = true;
      this.getRecycleBinData(assetId);
    }
  }

  comparator(valueA, valueB) {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  }

  openRestoreAllModal() {
    this.idOfAssetTORestore = undefined;
    this.utilsService.openModal('restoreAllAssetsModal');

  }


  deleteAssetById(assetId, modalId: string) {
    const formData = new FormData();
    formData.set('asset_ids', assetId);

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.deleteAssetPermanentlyAPI, formData, (response) => {
      if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
        console.log('Assets Deleted Successfully');
        this.utilsService.hideModal(modalId);
        this.getRecycleBinData(this.assetIdForGetFolderAssets ? this.assetIdForGetFolderAssets : 0);
        this.arrayOfSelectedAssets = new Array<number>();
      }
    }, true);
  }

  openRestoreModal(idOfAsset) {
    this.idOfAssetTORestore = idOfAsset;
    this.utilsService.openModal('restoreModal');
  }

  restoreAssetById(idOfAsset, modalId) {
    const formData = new FormData();

    formData.set('asset_ids', idOfAsset);
    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.restoreDeletedAssetAPI, formData, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.utilsService.hideModal(modalId);

        this.getRecycleBinData(this.assetIdForGetFolderAssets ? this.assetIdForGetFolderAssets : 0);
        this.arrayOfSelectedAssets = new Array<number>();

      }
    }, true);
  }
}
