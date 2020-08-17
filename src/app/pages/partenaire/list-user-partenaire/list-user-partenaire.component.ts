import {Component, OnInit, ViewChild} from '@angular/core';
import {PartenaireService} from '../../../services/partenaire.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-user-partenaire',
  templateUrl: './list-user-partenaire.component.html',
  styleUrls: ['./list-user-partenaire.component.css']
})
export class ListUserPartenaireComponent implements OnInit {
  partenaires = [];
  dataPartenaire: any;
  roles: string;
  email: string;
  constructor(private ps: PartenaireService, private route: Router ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'prenom', 'nom', 'email', 'role', 'isActive', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.ps.getUserPartenaire()
      .subscribe( data => {
        this.partenaires.push(this.partenaires);
        this.dataPartenaire = data;
        this.listData = new MatTableDataSource(this.dataPartenaire);
        this.listData.paginator = this.paginator;
      });
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.email = JSON.parse(localStorage.getItem('username'));
  }
  isPartenaire() {
    if ( this.roles[0] === 'ROLE_PARTENAIRE' || this.roles[0] === 'ROLE_ADMIN_PARTENAIRE') {
      return true;
    }
  }
  delete(id: number) {
    if ( confirm('Etes vous  sur de vouloir supprimer cet utlisateur')) {
      this.ps.delete(id).subscribe(data => {
        location.reload();
      });
    }
  }
}
