import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartenaireService} from '../../../services/partenaire.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partenaire-existant',
  templateUrl: './partenaire-existant.component.html',
  styleUrls: ['./partenaire-existant.component.css']
})
export class PartenaireExistantComponent implements OnInit {

  compteForm: FormGroup;
  searchForm: FormGroup;
  dataSearch: any;
  roles: string;
  submitted = false;
  constructor(private partenaire: PartenaireService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.compteForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.pattern('[0-9]{0,}')]],
    });
    this.searchForm = this.formBuilder.group({
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
      ninea: this.searchForm.value.ninea
    };
    this.partenaire.getNinea(search).subscribe( data => {
        this.dataSearch = data;
      }, error => {
        alert(JSON.stringify(error));
      });
  }
  onSubmitForm() {
    this.submitted = true;
    if (this.compteForm.invalid) {
      return;
    }
    const compte = {
      ninea: this.searchForm.value.ninea,
      montant: this.compteForm.value.montant,
    };

    this.partenaire.createComptePartenaireExistant(compte).subscribe(data => {
       alert('Un nouveau compte a été crée pour ce partenaire existant ');
       console.log(data);
       return this.router.navigate(['/list-comptes']);
     }, error => {
      alert(JSON.stringify(error));
    });
  }
  get f() { return this.searchForm.controls; }
  get g() { return this.compteForm.controls; }
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
