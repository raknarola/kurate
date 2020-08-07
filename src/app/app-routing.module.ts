import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'kurate',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: 'kurate',
        loadChildren: './login-regisration/login.module#LoginModule'
    },
    {
        path: 'share',
        loadChildren: './share-link/share-link.module#ShareLinkModule'
    },
    {
        path: '**',
        redirectTo: 'kurate',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        SharedModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
