import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private  authService: AuthService, private  route: Router) { }

  ngOnInit() {
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.authService.logout();
    return this.route.navigate(['login']);
  }
}
