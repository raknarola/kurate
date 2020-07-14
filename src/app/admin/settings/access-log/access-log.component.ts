import { Component, OnInit } from '@angular/core';
import { AccessLogService } from './Access-Log.service';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css']
})
export class AccessLogComponent extends AccessLogService implements OnInit {


  ngOnInit() {
    this.applyValidation();
    this.fullWidthCellRenderer = "fullWidthCellRenderer";
    // this.getAccessLogData();
  }

}
