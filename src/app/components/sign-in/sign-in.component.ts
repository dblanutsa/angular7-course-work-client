import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;
  public loginOrEmail: FormControl;
  public password: FormControl;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.deleteToken();

    this.loginForm = new FormGroup({
      loginOrEmail: this.loginOrEmail = new FormControl(''),
      password: this.password = new FormControl('')
    });
  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      res => {
        console.log('Successfully logined!!!!!!');
        this.authService.setAuthToken(res.token);
        this.router.navigateByUrl('');
      },
      error => console.log(error)
    );
  }

  onRegister() {
    this.router.navigateByUrl('signup');
  }
}
