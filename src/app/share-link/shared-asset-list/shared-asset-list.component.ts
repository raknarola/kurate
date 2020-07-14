import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedAssetListService } from './Shared-Asset-List.service';

@Component({
  selector: 'app-shared-asset-list',
  templateUrl: './shared-asset-list.component.html',
  styleUrls: ['./shared-asset-list.component.css']
})
export class SharedAssetListComponent extends SharedAssetListService implements OnInit, OnDestroy {


  ngOnInit() {
    // this.getAllAssets(0);
    this.route.params.subscribe(params => {

      if (params['token']) {
        this.statusOfAction =
          params['token'];
        this.getAllAssets(params['token'], undefined);
      } else {
      }
    });
  }

  ngOnDestroy(): void {
    this.utilsService.flagForHideHeaderSearch = false;
  }

}
