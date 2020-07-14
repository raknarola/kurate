import { ShareService } from './Share.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent extends ShareService implements OnInit {


  ngOnInit() {
    this.getAllShares();
    this.applyShareValidations();
  }

}
