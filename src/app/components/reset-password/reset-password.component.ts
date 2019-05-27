import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public currentPassword: FormControl;
  public newPassword1: FormControl;
  public newPassword2: FormControl;

  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.resetPasswordForm = new FormGroup({
     currentPassword: this.currentPassword = new FormControl(''),
     newPassword1: this.newPassword1 = new FormControl(''),
     newPassword2: this.newPassword2 = new FormControl('')
   });
  }

  isNewPasswordsMatched() {
    return this.newPassword1.value === this.newPassword2.value;
  }

  onSubmit() {
    const formData = this.resetPasswordForm.value;

    this.authService.resetPassword({
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword1
    });
  }
}
