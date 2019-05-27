import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  private users;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserList().subscribe((users) => this.users = users);
  }
}
