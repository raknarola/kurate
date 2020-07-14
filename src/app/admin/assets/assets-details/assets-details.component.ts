import { AssetsDetailsService } from './Assets-Details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-details',
  templateUrl: './assets-details.component.html',
  styleUrls: ['./assets-details.component.css']
})
export class AssetsDetailsComponent extends AssetsDetailsService implements OnInit {


  ngOnInit() {

    this.applyCollectionValidations();
    this.getAllCollections();
    this.route.params.subscribe(params => {
      console.log('params => ', params);

      if (params['idOfAssets']) {
        this.statusOfAction =
          params['idOfAssets'];
        this.getAssetsDetails(params['idOfAssets']);

      } else {
      }
    });
  }

}
