import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../../services/transaction.service';
import {PartenaireService} from '../../../services/partenaire.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.component.html',
  styleUrls: ['./envoi.component.css']
})
export class EnvoiComponent implements OnInit {

  constructor(private transaction: TransactionService, private ps: PartenaireService, private router: Router, private formBuilder: FormBuilder) {
  }

  envoiForm: FormGroup;
  roles: string;
  submitted = false;
  comptes: any;
  dataEnvoi = [];
  values: any;
  infosCompte: any;
  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.envoiForm = this.formBuilder.group({
      prenomE: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      nomE: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      telephoneE: ['', [Validators.required, Validators.pattern('^[77,78,76,70]{2}[0-9]{7}$')]],
      npieceE: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      prenomB: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      nomB: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      telephoneB: ['', [Validators.required, Validators.pattern('^[77,78,76,70]{2}[0-9]{7}$')]],
      montant: ['', [Validators.required, Validators.pattern('[0-9]{0,}')]],
      numCompte: ['']
    });
    this.ps.getCompte().subscribe(data => {
      this.comptes = data;
    });
     this.transaction.getInfosCompte().subscribe( data => {
       console.log(data);
       this.infosCompte = data;
     },
     error => {
        alert(error);
     });
  }

  onSubmitForm() {
    this.submitted = true;
    if (this.envoiForm.invalid) {
      return;
    }
    const envoi = {
      prenomE: this.envoiForm.value.prenomE,
      nomE: this.envoiForm.value.nomE,
      telephoneE: this.envoiForm.value.telephoneE,
      npieceE: this.envoiForm.value.npieceE,
      prenomB: this.envoiForm.value.prenomB,
      nomB: this.envoiForm.value.nomB,
      telephoneB: this.envoiForm.value.telephoneB,
      montant: this.envoiForm.value.montant,
      numCompte: this.envoiForm.value.numCompte
    };
    this.transaction.envoi(envoi).subscribe(data => {
      this.dataEnvoi = data;
      localStorage.setItem('dataEnvoi', JSON.stringify(this.dataEnvoi));
      alert('Vous avez envoyé ' + this.envoiForm.value.montant + ' FCA' +
       ' à ' + this.envoiForm.value.prenomB +
       ' ' + this.envoiForm.value.nomB);
      return this.router.navigate(['pdf-recu']);
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  isPartenaire() {
    if (this.roles[0] === 'ROLE_PARTENAIRE' || this.roles[0] === 'ROLE_ADMIN_PARTENAIRE') {
      return true;
    }
  }
  isUserPartenaire() {
      if ( this.roles[0] === 'ROLE_USER_PARTENAIRE') {
        return true;
      }
    }
  get f() {
    return this.envoiForm.controls;
  }

}
