import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersAndRolesComponent } from './users-and-roles/users-and-roles.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {
    DemoFileUploadCloudComponent
} from './demo-file-upload-cloud/demo-file-upload-cloud.component';
import { CollectionsComponent } from './collections/collections.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'work_area',
        pathMatch: 'full '
    },
    {
        path: 'work_area',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'user-role',
                component: UsersAndRolesComponent
            },
            {
                path: 'demo-cloud-file-upload',
                component: DemoFileUploadCloudComponent
            },
            {
                path: 'collections',
                component: CollectionsComponent
            },
            {
                path: 'assets',
                loadChildren: './assets/assets.module#AssetsModule'
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            },
            {
                path: 'share',
                component: ShareComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        AgGridModule.withComponents([])
    ],
    declarations: [
        AdminComponent,
        UsersAndRolesComponent,
        DemoFileUploadCloudComponent,
        CollectionsComponent,
        ShareComponent
    ],
    entryComponents: []
})

export class AdminModule { }
