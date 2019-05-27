import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit, CanActivate {

  public registerForm: FormGroup;
  public login: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public password: FormControl;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      login: this.login = new FormControl(''),
      firstName: this.firstName = new FormControl(''),
      lastName: this.lastName = new FormControl(''),
      email: this.email = new FormControl(''),
      password: this.password = new FormControl('')
    });
  }

  onSubmit() {
    this.authService.signup(this.registerForm.value).subscribe(
      res => {
        console.log('User success registered!!!');
        this.router.navigateByUrl('signin');
      }
    );
  }

  onLogin() {
    this.router.navigateByUrl('signin');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.authService.getAuthToken();
  }
}
