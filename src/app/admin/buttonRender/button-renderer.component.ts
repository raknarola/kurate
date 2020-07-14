// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';
import { UserDetails } from 'src/app/models/UserDetails';
import { Serialize } from 'cerialize';

@Component({
  selector: 'app-button-renderer',
  template: `
     <a (click)="onClick($event, 'View')" *ngIf="isDisplayShareIcon === true"   matTooltip="View" style="font-size:small;cursor: pointer;">
                              <i class="material-icons" >remove_red_eye </i>

</a>
   <a (click)="onClick($event, 'Share')" *ngIf="isDisplay === true && isDisplayShareIcon === true"   matTooltip="Share" style="font-size:small;cursor: pointer;">
                              <i class="material-icons" >share</i>

</a>
    <a (click)="onClick($event, 'Edit')" matTooltip="Edit"   *ngIf="isDisplay === true"  style="font-size:small;cursor: pointer;">
    <i class="material-icons">create</i>
</a>
    <a  (click)="onClick($event, 'Delete')" matTooltip="Delete"  *ngIf="isDisplay === true" style="font-size:small;color:#fd0000;cursor: pointer;">
    <i class="material-icons">delete</i></a>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  url_index = location.href.indexOf('#');
  params;
  label: string;
  isDisplay = false;
  isDisplayShareIcon = false;

  agInit(params): void {
    this.params = params;
    // console.log(this.params.colDef.field);
    // console.log(localStorage.getItem('user'));
    const roleId = this.getLoginUsers().role.id;
    if (roleId === 1) {
      this.isDisplay = true;
    } else {
      this.isDisplay = false;
    }

    if (this.params.colDef.field === 'edit_delete_share_icon') {
      this.isDisplayShareIcon = true;
    }
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
  getLoginUsers(): UserDetails {

    const user = Serialize(JSON.parse(localStorage.getItem('user')), UserDetails);
    if (user != null) {
      return user;
    }
  }
}
