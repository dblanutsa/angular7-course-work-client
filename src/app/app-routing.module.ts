import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/signup/signup.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {MainComponent} from './components/main/main.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';
import {ProfileComponent} from './components/profile/profile.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AdminPageComponent} from './components/admin-page/admin-page.component';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent, canActivate: [SignUpComponent]},
  {path: 'signin', component: SignInComponent},
  {path: 'logout', component: SignInComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: '', component: MainComponent, canActivate: [MainComponent]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
