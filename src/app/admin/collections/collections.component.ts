import { CollectionsService } from './Collections.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.css']
})

export class CollectionsComponent extends CollectionsService implements OnInit {

    ngOnInit() {
        this.applyCollectionValidations();
        this.itemsPerPage = 10;
        this.sortingOrder = ['asc', 'desc'];
        this.fullWidthCellRenderer = 'fullWidthCellRenderer';
        this.getAllCollections();
        this.applyShareValidations();
    }

}
