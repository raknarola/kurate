import { LoginService } from './Login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends LoginService implements OnInit {


  ngOnInit() {
    this.applyValidation();
  }

}
