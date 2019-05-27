import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: this.firstName = new FormControl(this.authService.profile.firstName),
      lastName: this.lastName = new FormControl(this.authService.profile.lastName),
      email: this.email = new FormControl(this.authService.profile.email)
    });
  }

  onSubmit() {
    this.authService.updateProfile(this.profileForm.value);
  }
}
