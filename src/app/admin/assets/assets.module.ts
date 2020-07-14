import { AssetsComponent } from './assets.component';
import { AssetsDetailsComponent } from './assets-details/assets-details.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchResultAssetsComponent } from './search-result-assets/search-result-assets.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'all-assets', pathMatch: 'full ' },
  { path: 'all-assets', component: AssetsComponent },
  { path: 'search-assets/:search', component: AssetsComponent },
  { path: 'assets-details/:idOfAssets', component: AssetsDetailsComponent }

];

@NgModule({
  declarations: [AssetsDetailsComponent, AssetsComponent, SearchResultAssetsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AssetsModule { }
