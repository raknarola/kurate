import { SharedAssetDetailsService } from './Shared-Asset-Details.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shared-asset-details',
  templateUrl: './shared-asset-details.component.html',
  styleUrls: ['./shared-asset-details.component.css']
})
export class SharedAssetDetailsComponent extends SharedAssetDetailsService implements OnInit,OnDestroy {

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params['idOfAssets'] && params['token']) {
        this.statusOfAction =
        params['token'];
        this.getAssetsDetails(params['idOfAssets'], params['token'] );
      } else {
      }
    });
  }

  ngOnDestroy(): void {
    this.utilsService.flagForHideHeaderSearch = false;
  }

}
