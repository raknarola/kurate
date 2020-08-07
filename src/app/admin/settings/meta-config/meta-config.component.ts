import { Component, OnInit } from '@angular/core';
import { MetaConfigService } from './meta-config.service';

@Component({
    selector: 'app-meta-config',
    templateUrl: './meta-config.component.html',
    styleUrls: ['./meta-config.component.css']
})

export class MetaConfigComponent extends MetaConfigService implements OnInit {

    ngOnInit() {
        this.getMetaFields();
        this.getMetaElements();
        this.applyMetaDataValidations();
    }
}
