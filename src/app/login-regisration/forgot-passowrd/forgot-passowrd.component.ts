import { ForgotPasswordService } from './Forgot-Password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.css']
})
export class ForgotPassowrdComponent extends ForgotPasswordService implements OnInit {


  ngOnInit() {
    this.applyValidation();
  }

}
