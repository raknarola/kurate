import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs-compat';
import { Component, OnInit } from '@angular/core';
import { Assets } from '../models/Assets';
import { Permissions } from '../models/Permissions';

@Component({
  selector: 'app-check-authorization',
  templateUrl: './check-authorization.component.html',
  styleUrls: ['./check-authorization.component.scss']
})
export class CheckAuthorizationComponent implements OnInit {

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {
  }

  // returns a boolean observable
  public checkAuthorization(path: any): Observable<boolean> {

    return Observable.of(this.doCheckAuthorization(path));
  }

  private doCheckAuthorization(path: string[]): boolean {
    const keys = this.parsePath(path);
    if (keys.length) {
      console.log(keys);

      const entry = this.findEntry(this.utilsService.arrayOfPermissionForAssets, keys);
      return entry;
    }

  }

  private parsePath(path: any): string[] {
    if (typeof path === 'string') {
      return path.split('.');
    }
    if (Array.isArray(path)) {
      return path;
    }
    return [];
  }

  /**
 * Recursively find workflow-map entry based on the path strings
 */
  private findEntry(currentObject: Array<Permissions>, keys: string[], index = 0) {

    const key = keys[index];
    // console.log(currentObject);
    const index1 = currentObject.findIndex(val => val.name === key);
    // console.log(index1);

    // if (currentObject[key] && index < keys.length - 1) {
    //   return this.findEntry(currentObject[key], keys, index + 1);
    // } else if (currentObject[key] && index === keys.length - 1) {
    //   return currentObject[key];
    // } else {
    //   return false;
    // }
    if (index1 !== -1) {
      return currentObject[index1][keys[1]];
    } else {
      return false;
    }
  }

}
