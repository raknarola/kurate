import { UtilsService } from './services/utils.service';
import { NavigationStart, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    title = 'kurate-angular';
    tooglemore = false;

    constructor(
        public router: Router,
        public utilsService: UtilsService
    ) {
        this.utilsService.applyCreateFolderValidations();
        router.events.forEach(val => {
            if (val instanceof NavigationStart) {
                console.log('Current Url : ' + val.url);
                if (this.utilsService.isNullUndefinedOrBlank(this.utilsService.getLoginUsers())) {
                    // if not data in session // val.url !== '/home/work_area/landing' &&
                    if (val.url !== '/' && val.url !== '/kurate/login' && val.url !== '/kurate/forgot-password'
                        && !val.url.includes('/share/sharedAssets/') && !val.url.includes('/share/assets-details/')) {
                        // this.utilsService.redirectTo('/home/work_area/landing');
                        this.utilsService.redirectTo('/kurate/login');
                    }
                } else {
                    if (val.url === '/' || val.url === '/kurate/login' || val.url === '/kurate/registration' || val.url === '/kurate/forgot-password') {
                        // if user then check his url allowed or not
                        if (this.utilsService.isNullUndefinedOrBlank(this.utilsService.getToken())) {
                            console.log('........Admin login............' + val.url);
                            this.router.navigate(['/user/work_area/dashboard']);
                        } else {
                            this.router.navigate(['/admin/work_area/dashboard']);
                        }
                    }
                }
            }
        });
        if (this.utilsService.getLoginUsers()) {
            this.utilsService.setArrayPermssiontoAssets();
        }
    }

}
