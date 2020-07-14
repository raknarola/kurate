import { RecycleBinService } from './Recycle-Bin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.css']
})
export class RecycleBinComponent extends RecycleBinService implements OnInit {


  ngOnInit() {
    this.getRecycleBinData(0);
  }

}
