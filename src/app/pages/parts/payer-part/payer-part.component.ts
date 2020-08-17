import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CountService} from '../../../services/count.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-payer-part',
  templateUrl: './payer-part.component.html',
  styleUrls: ['./payer-part.component.css']
})
export class PayerPartComponent implements OnInit {
  searchForm: FormGroup;
  dataSearch: any;
  submitted = false;
  total: number;
  envoi = false;
  retrait = false;
  parts = [];
  roles: string;
  listData: MatTableDataSource<any>;
  displayedColumnsEnvoi: string[] = ['code', 'montant', 'comEnvoi',  'dateEnvoi'];
  displayedColumnsRetrait: string[] = ['code', 'montant', 'comRetrait',  'dateRetrait'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private part: CountService, private route: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      type: ['', [Validators.required]],
      ninea: ['', [Validators.required]],
    });
    this.roles = JSON.parse(localStorage.getItem('roles'));
  }
  onSubmitSearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    const search = {
      dateDebut: this.searchForm.value.dateDebut,
      dateFin: this.searchForm.value.dateFin,
      type: this.searchForm.value.type,
      ninea: this.searchForm.value.ninea,

    };
    if (this.searchForm.value.type === 'envoi') {
        this.part.recherchePartEnvoi(search).subscribe( data => {
          this.retrait = false;
          this.envoi = true;
          this.dataSearch = data;
          if (this.dataSearch) {
            let sum = 0 ;
            for (let j = 0; j < this.dataSearch.length; j++) {
              sum += this.dataSearch[j].comEnvoi;
            }
            this.total = sum;
            console.log(this.total);
          }
          this.parts.push(this.parts);
          this.listData = new MatTableDataSource(this.dataSearch);
          this.listData.paginator = this.paginator;
          console.log(this.dataSearch);
        }, error => {
          alert(JSON.stringify(error));
        });
     } else if (this.searchForm.value.type === 'retrait') {
      this.part.recherchePartRetrait(search).subscribe( data => {
                this.envoi = false;
                this.retrait = true;
                this.dataSearch = data;
                if (this.dataSearch) {
                  let sum = 0 ;
                  for (let j = 0; j < this.dataSearch.length; j++) {
                    sum += this.dataSearch[j].comEnvoi;
                  }
                  this.total = sum;
                  console.log(this.total);
                }
                this.parts.push(this.parts);
                this.listData = new MatTableDataSource(this.dataSearch);
                this.listData.paginator = this.paginator;
                console.log(this.dataSearch);
              }, error => {
                alert(JSON.stringify(error));
              });
     } else {
      return;
    }


  }
  get f() { return this.searchForm.controls; }
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
