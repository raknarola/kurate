import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUserRightsByMenuNameService {

  constructor(public utilsService: UtilsService) { }

  /**
   * @author Dhrumin Ranoliya
   * @param route data object that we will passed when routing initialize
   * @function checkUserRightfromLocalStorage will check the user right isView from userRights object for AccessRights purpose
   */
  checkUserRightfromLocalStorage(route) {
    // console.log(route);

    const userRights = Object(JSON.parse(localStorage.getItem('user-Rights')));
    // console.log(userRights);
    // console.log(route.menuName);

    const isViewRight = this.findEntry(userRights, [route.menuName, 'isView']);
    // console.log(isViewRight);

    return isViewRight;
  }

  /**
   * @author Dhrumin Ranoliya
   * @param menuName menuName that we will passed when routing initialize in data object
   * @function checkUserRightfromLocalStorageByRight will check the dynamic user right of menu that will pass in parameters  from userRights object for AccessRights purpose
   */
  checkUserRightfromLocalStorageByRight(menuName, right) {
    const userRights = Object(JSON.parse(localStorage.getItem('user-Rights')));
    const isViewRight = this.findEntry(userRights, [menuName, right]);
    console.log(isViewRight);

    return isViewRight;
  }

  /**
   * @author Dhrumin Ranoliya
   * @param currentObject is an object that contain user rights for find right using key value
   * @param keys is string array tha contain two string first is  key == menuname  ans second is userRight like(isAdd, isEdit)
   * @param index used altenatively for traverse in user Right object for user right
   * @function findEntry will used for find user right of particular menu by traversing from the array of object that contain all menu rights
   * @returns boolean value by checking userRights
   */
  private findEntry(currentObject: any, keys: string[], index = 0) {

    const key = keys[index];

    if (currentObject[key] && index < keys.length - 1) {
      return this.findEntry(currentObject[key], keys, index + 1);
    } else if (currentObject[key] && index === keys.length - 1) {
      return currentObject[key];
    } else {
      return false;
    }
  }

}
