import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-button-renderer',
  template: `<div class="custom-control custom-checkbox">
<input type="checkbox" class="custom-control-input" id="checkbox{{checkBoxId}}"   [(ngModel)]="params.value" (change)="refresh(this.params)">
<label class="custom-control-label" for="checkbox{{checkBoxId}}" ></label>
</div>
    `
})
export class CheckboxRenderComponent implements ICellRendererAngularComp {
  params;
  checkBoxId: number = 0;
  constructor() {
    this.checkBoxId = Math.random();
    // console.log(this.checkBoxId);


  }

  agInit(params): void {
    this.params = params;
    // console.log(params);
    // if (params.data.serialNo > 0) {
    //   this.isDisplay = false;
    // } else {
    //   this.isDisplay = true;
    // }
  }


  refresh(params: any): boolean {
    // console.log(params.data.permission);
    // console.log(this.params.colDef.field);
    const array = this.params.colDef.field.split('.')[1];
    // console.log(array);

    params.data.permission[array] = params.value;
    // console.log(params.value);
    params.api.refreshCells(params);
    return false;
  }

  // onChange($event, value) {
  //   if (this.params.onChange instanceof Function) {
  //     // put anything into params u want pass into parents component
  //     const params = {
  //       event: $event,
  //       rowData: this.params.node.data,
  //       value: value // set here
  //     };
  //     this.params.onChange(params);
  //   }
  // }
  public onChange(event) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
  }
}
