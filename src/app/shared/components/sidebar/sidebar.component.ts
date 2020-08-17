import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roles: string;
  email: string;
  constructor() { }

  ngOnInit(): void {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.email = JSON.parse(localStorage.getItem('username'));
  }

  isAdmin() {
    if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
      return true;
    }
  }
  isCaissier() {
      if ( this.roles[0] === 'ROLE_CAISSIER') {
        return true;
      }
    }
  isPartenaire() {
    if ( this.roles[0] === 'ROLE_PARTENAIRE' || this.roles[0] === 'ROLE_ADMIN_PARTENAIRE') {
      return true;
    }
  }

  isUserPartenaire() {
    if ( this.roles[0] === 'ROLE_USER_PARTENAIRE') {
      return true;
    }
  }

}
