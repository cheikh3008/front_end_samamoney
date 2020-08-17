import {Component, OnInit, ViewChild} from '@angular/core';
import {PartenaireService} from '../../../services/partenaire.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.css']
})
export class ListDepotComponent implements OnInit {

  constructor(private ps: PartenaireService ) { }
  depot = [];
  dataDepot: any;
  roles: string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'numCompte', 'montant', 'createdAt']
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.ps.getDepot()
      .subscribe( data => {
        this.depot.push(this.depot);
        this.dataDepot = data;
        this.listData = new MatTableDataSource(this.dataDepot);
        this.listData.paginator = this.paginator;
      });
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }
  isAdmin() {
    if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
      return true;
    }
  }

}
