import {Component, OnInit, ViewChild} from '@angular/core';
import {CountService} from '../../../services/count.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-part',
  templateUrl: './list-part.component.html',
  styleUrls: ['./list-part.component.css']
})
export class ListPartComponent implements OnInit {
  constructor(private part: CountService ) { }
  parts = [];
  dataParts: any;
  roles: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['code', 'montant', 'comSysteme', 'comEtat' , 'comEnvoi', 'comRetrait', 'dateEnvoi'];
  displayedColumnsPartenaire: string[] = ['code', 'montant',  'comEnvoi', 'dateEnvoi'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.part.getPart()
      .subscribe( data => {
        this.parts.push(this.parts);
        this.dataParts = data;
        this.listData = new MatTableDataSource(this.dataParts);
        this.listData.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }
  isAdmin() {
    if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
      return true;
    }
  }
  isPartenaire() {
    if ( this.roles[0] === 'ROLE_PARTENAIRE' || this.roles[0] === 'ROLE_ADMIN_PARTENAIRE') {
      return true;
    }
  }
}
