import { Component, OnInit } from '@angular/core';
import {PartenaireService} from '../../../services/partenaire.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})

export class AddDepotComponent implements OnInit {
  depotForm: FormGroup;
  dataSearch: any;
  searchForm: FormGroup;
  roles: string;
  submitted = false;
  constructor(private ps: PartenaireService, private route: Router, private formBuilder: FormBuilder) {
  }

   ngOnInit() {
    this.searchForm = this.formBuilder.group({
      numCompte: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });
    this.depotForm = this.formBuilder.group({
       montant: ['', [Validators.required, Validators.pattern('[0-9]{0,}')]],
     });
     this.roles = JSON.parse(localStorage.getItem('roles'));
    }
    onSubmitSearch() {
      this.submitted = true;
      if (this.searchForm.invalid) {
        return;
      }
      const search = {
       numCompte: this.searchForm.value.numCompte
     };
      this.ps.getNumCompte(search).subscribe( data => {
       this.dataSearch = data;
      }, error => {
        alert(JSON.stringify(error));
      });
    }
    onSubmitForm() {
      this.submitted = true;
      if (this.depotForm.invalid) {
        return;
      }
      const  depot = {
        numCompte: this.searchForm.value.numCompte,
        montant: this.depotForm.value.montant
      };
      this.ps.faireDepot(depot).subscribe(data => {
        alert(JSON.stringify(data));
        this.route.navigate(['list-depots']);
      }, error => {
        alert(JSON.stringify(error));
      });
    }
  get f() { return this.searchForm.controls; }
  get g() { return this.depotForm.controls; }
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
}
