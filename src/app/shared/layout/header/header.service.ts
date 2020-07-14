import { Injectable } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { StorageListnerService } from '../../../services/storage-listner.service';
import { Tags } from '../../../models/Tags';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  searchNgModel: string;
  arrayOfTags: Array<Tags> = new Array<Tags>();
  selectedVal: string;
  mainSearchNgModel: string;
  flagForHideShowSearchInput: boolean;
  flag: boolean;
  constructor(public utilsService: UtilsService, public storageListnerService: StorageListnerService) {
  }
}
