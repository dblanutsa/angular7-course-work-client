import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken;
  private tokenName = 'authToken';
  public profile;

  constructor(private httpClient: HttpClient,
              private location: Location) { }

  public getApiURL(): string {
    return 'http://localhost:8082';
  }

  public setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem(this.tokenName, token);
  }

  public hasRole(role) {
    return this.profile.roles.includes(role);
  }

  public getAuthToken() {
    if (this.authToken) {
      return this.authToken;
    } else {
      const token = localStorage.getItem(this.tokenName);
      if (token) {
        return this.authToken = token;
      } else {
        return null;
      }
    }
  }

  public deleteToken() {
    this.authToken = null;
    localStorage.removeItem(this.tokenName);
  }

  public getUserList(): Observable<any> {
    return this.httpClient.get(`${this.getApiURL()}/user/list`);
  }

  public signup(data): Observable<any> {
    return this.httpClient.post(`${this.getApiURL()}/auth/signup`, data);
  }

  public signin(data): Observable<any> {
    return this.httpClient.post(`${this.getApiURL()}/auth/signin`, data);
  }

  public getProfile() {
    this.httpClient.get(`${this.getApiURL()}/user/profile`).subscribe(
      (profile) => this.profile = profile
    );
  }

  public updateProfile(profile) {
    this.httpClient.post(`${this.getApiURL()}/user/profile`, profile).subscribe(
      (newProfile) => {
        this.profile = newProfile;
        this.location.back();
      }
    );
  }

  public resetPassword(data) {
    this.httpClient.post(`${this.getApiURL()}/user/resetPassword`, data).subscribe();
  }

  public checkLogin(login: string): Observable<any> {
    return this.httpClient.get(`${this.getApiURL()}/auth/checkLogin?login=${login}`);
  }

  public checkEmail(email: string): Observable<any> {
    return this.httpClient.get(`${this.getApiURL()}/auth/checkEmail?email=${email}`);
  }
}
