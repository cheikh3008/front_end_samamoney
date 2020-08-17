import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-liste-envoi',
  templateUrl: './liste-envoi.component.html',
  styleUrls: ['./liste-envoi.component.css']
})
export class ListeEnvoiComponent implements OnInit {
  dataListeEnvoi: any;
  envois = [];
  roles: string;
  constructor(private  transaction: TransactionService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['prenomE', 'nomE', 'telephoneE', 'npieceE', 'prenomB', 'nomB', 'telephoneB', 'montant', 'frais', 'dateEnvoi'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.transaction.getListeEnvoi().subscribe(data => {
      this.dataListeEnvoi = data;
      this.envois.push(this.envois);
      this.dataListeEnvoi = data;
      this.listData = new MatTableDataSource(this.dataListeEnvoi);
      this.listData.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
    this.roles = JSON.parse(localStorage.getItem('roles'));
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
