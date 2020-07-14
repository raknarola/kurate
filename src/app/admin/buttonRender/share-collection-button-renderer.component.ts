// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: `
      <a (click)="onClick($event, 'View')"   matTooltip="View" style="font-size:small;cursor: pointer;">
                              <i class="material-icons" >remove_red_eye </i>

</a>
   <a (click)="onClick($event, 'Share')"   matTooltip="Share" style="font-size:small;cursor: pointer;">
                              <i class="material-icons" >share</i>

</a>
    <a (click)="onClick($event, 'Edit')" matTooltip="Edit"  style="font-size:small;cursor: pointer;">
    <i class="material-icons">create</i>
</a>
    <a  (click)="onClick($event, 'Delete')" matTooltip="Delete" style="font-size:small;color:#fd0000;cursor: pointer;">
    <i class="material-icons">delete</i></a>
    `
})

export class ShareCollectionButtonRendererComponent implements ICellRendererAngularComp {
  url_index = location.href.indexOf('#');
  params;
  label: string;
  // isDisplay = false;

  agInit(params): void {
    this.params = params;
    // console.log(params);
    // if (params.data.serialNo > 0) {
    //   this.isDisplay = false;
    // } else {
    //   this.isDisplay = true;
    // }
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event, value) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        value: value // set here
      };
      this.params.onClick(params);
    }
  }
}
