import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users = [];
  dataUser: any;
  roles: string;
  constructor(private userService: UserService, private route: Router, private authService: AuthService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'prenom', 'nom', 'email', 'role', 'isActive', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.userService.read()
      .subscribe( data => {
        this.users.push(this.users);
        this.dataUser = data;
        this.listData = new MatTableDataSource(this.dataUser);
        this.listData.paginator = this.paginator;
      });
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }
  deletePost(id: number) {
    if ( confirm('Etes vous  sur de vouloir supprimer cet utlisateur')) {
      this.userService.delete(id).subscribe(data => {
        location.reload();
      });
    }
  }

  onStatus(id: number) {
    this.userService.desableUser(id).subscribe(data => {
      alert(JSON.stringify(data));
      location.reload();
    });
  }
  getId(id: number) {
    this.route.navigate(['/edit', id]);
  }
  isAdmin() {
      if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
        return true;
      }
    }
}
