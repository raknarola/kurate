import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class StorageListnerService implements OnDestroy {

    private onSubject = new Subject<{ key: string, value: any }>();
    public changes = this.onSubject.asObservable();
    key = 'user';

    constructor(
        public router: Router,
        public utilsService: UtilsService
    ) {
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }

    public store(key: string, data: any): void {
        localStorage.setItem(key, data);
        this.onSubject.next({ key: key, value: data });
    }

    public clear(): void {
        const key = 'user';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('search-param');
        localStorage.removeItem('isSearched');
        localStorage.removeItem('folderKey');
        localStorage.removeItem('permission');
        localStorage.removeItem('assetView');
        localStorage.removeItem('search-tags-param');
        localStorage.removeItem('orderBy');
        localStorage.removeItem('sortBy');
        this.utilsService.allPermissions = undefined;
        this.utilsService.flagForHideShowSearchInput = false;
        this.utilsService.searchNgModel = [];
        this.utilsService.mainSearchNgModel = undefined;
        this.utilsService.offsetCount = 0;
        this.utilsService.previousOffset = 0;
        this.utilsService.loaderStart = 0;
        this.router.navigate(['/kurate/login']);
        this.onSubject.next({ key: key, value: null });
    }

    private start(): void {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        // if (!event.newValue) {
        //   this.router.navigate(['/notary/login']);
        //   this.dialogRef.closeAll();
        // } else {
        //   this.utilsService.redirectTOHomeOnCancel();
        // }
        if (event.storageArea === localStorage) {
            let v: any;
            try {
                v = JSON.parse(event.newValue);
            } catch (e) {
                v = event.newValue;
            }
            if (event.key === this.key) {
                if (!v) {
                    this.router.navigate(['/kurate/login']);
                } else {
                    this.utilsService.redirectTo('admin/work_area/dashboard');
                }
            }
            this.onSubject.next({ key: event.key, value: v });
        }
    }

    private stop(): void {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
        this.onSubject.complete();
    }

}
