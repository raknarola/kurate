import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {

    constructor(
        public utilsService: UtilsService
    ) { }

    ngOnInit() { }

    // tooglemenu() {
    //   this.tooglemore =! this.tooglemore;
    // }

}
