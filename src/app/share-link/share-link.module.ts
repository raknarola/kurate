import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './share-link.component';
import { SharedAssetListComponent } from './shared-asset-list/shared-asset-list.component';
import { SharedAssetDetailsComponent } from './shared-asset-details/shared-asset-details.component';
import { Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'all-assets', pathMatch: 'full ' },
  { path: 'sharedAssets/:token', component: SharedAssetListComponent },
  { path: 'assets-details/:token/:idOfAssets', component: SharedAssetDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ShareLinkComponent, SharedAssetDetailsComponent, SharedAssetListComponent],
  entryComponents: []

})
export class ShareLinkModule { }
