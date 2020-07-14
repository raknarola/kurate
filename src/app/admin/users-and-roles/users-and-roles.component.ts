import { UsersAndRolesService } from './Users-And-Roles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-and-roles',
  templateUrl: './users-and-roles.component.html',
  styleUrls: ['./users-and-roles.component.css']
})
export class UsersAndRolesComponent extends UsersAndRolesService implements OnInit {




  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.applyUserValidations();
    this.applyRoleValidations();
    this.getAllRoles();
    this.getAllUsers();
    this.defaultColDef = { resizable: true }; // width: 60
    // console.log(this.innerWidth);
    this.username_prefix = this.utilsService.organizationObj.prefix;

  }

}
