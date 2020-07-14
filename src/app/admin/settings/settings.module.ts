import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../shared/shared.module';
import { UsageComponent } from './usage/usage.component';
import { AccessLogComponent } from './access-log/access-log.component';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MetaConfigComponent } from './meta-config/meta-config.component';

const routes: Routes = [
  { path: '', redirectTo: 'usage', pathMatch: 'full' },
  { path: 'usage', component: UsageComponent },
  { path: 'access-log', component: AccessLogComponent },
  { path: 'recycle-bin', component: RecycleBinComponent },
  { path: 'meta-config', component: MetaConfigComponent }


];

@NgModule({
  declarations: [SettingsComponent, UsageComponent, AccessLogComponent, RecycleBinComponent, MetaConfigComponent],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
