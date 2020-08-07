import { UtilsService } from '../../services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Tags } from '../../models/Tags';
import { Deserialize } from 'cerialize';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    ngmodel: string;
    checked: boolean;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    searchNgModel = [];
    flagForHideShowSearchInput: boolean;
    mainSearchNgModel: string;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    arrayOfTags: Array<Tags> = new Array<Tags>();
    selectedVal: string;
    fruits: Fruit[] = [
        { name: 'Lemon' },
        { name: 'Lime' },
        { name: 'Apple' },
    ];

    constructor(
        public utilsService: UtilsService
    ) {
        localStorage.removeItem('isSearched');
        localStorage.removeItem('breadCrumbs');
        localStorage.removeItem('folderKey');
        localStorage.removeItem('search-param');
        localStorage.removeItem('search-tags-param');
        localStorage.removeItem('assetView');
        localStorage.removeItem('orderBy');
        localStorage.removeItem('sortBy');
        this.utilsService.flagForHideHeaderSearch = true;
        this.utilsService.flagForHideShowSearchInput = false;
        this.utilsService.isSearch = false;
    }

    ngOnInit() {
        this.selectedVal = 'MainSearch';
        this.utilsService.getList();
        this.flagForHideShowSearchInput = false;
    }

    onOpen(elem) {
        if (elem.filterInput.nativeElement.value === '') {
            elem.close();
        }
    }

    ngOnDestroy(): void {
        this.utilsService.flagForHideHeaderSearch = false;
        if (this.utilsService.isSearch === false) {
            this.utilsService.searchNgModel = [];
            this.utilsService.mainSearchNgModel = undefined;
            this.arrayOfTags = new Array<Tags>();
        }
    }

    getList() {
        const param = {};
        this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.listTagsAPI, param, (response) => {
            if (!this.utilsService.isNullUndefinedOrBlank(response)) {
                this.arrayOfTags = Deserialize(response, Tags);
            }
        });
    }

    redirectToSearchPage() {
        // console.log(this.searchNgModel);
        this.utilsService.searchAssets('', this.searchNgModel);
    }

    changeSearchBoxByToogle(event) {
        this.selectedVal = event.value;
        // console.log(event);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(fruit: Fruit): void {
        const index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }
}

export interface Fruit {
    name: string;
}
