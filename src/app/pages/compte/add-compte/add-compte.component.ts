import {Component, EventEmitter, OnInit, Output,} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PartenaireService} from '../../../services/partenaire.service';
import {MustMatch} from '../../../services/must-match.service';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {
  constructor(private partenaire: PartenaireService, private router: Router, private formBuilder: FormBuilder) {
  }
  compteForm: FormGroup;
  dataContrat = [];
  submitted = false;
  roles: string;
  ngOnInit() {
    this.compteForm = this.formBuilder.group({
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
      passwordComfirm: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
      ninea: ['', Validators.required],
      rc: ['', Validators.required],
      montant: ['', [Validators.required, Validators.pattern('[0-9]{0,}')]],
    },  {
      validator: MustMatch('password', 'passwordComfirm')
    });
        this.roles = JSON.parse(localStorage.getItem('roles'));
  }
  onSubmitForm() {
    this.submitted = true;
    if (this.compteForm.invalid) {
      return;
    }
    const compte = {
      prenom: this.compteForm.value.prenom,
      nom: this.compteForm.value.nom,
      email: this.compteForm.value.email,
      password: this.compteForm.value.password,
      rc: this.compteForm.value.rc,
      ninea: this.compteForm.value.ninea,
      montant: this.compteForm.value.montant
    };
    this.partenaire.createComptePartenaireNew(compte).subscribe(data => {
      this.dataContrat = data;
      alert('Vous avez crée un compte pour un nouveau partenaire  ' );
      localStorage.setItem('dataContrat', JSON.stringify(this.dataContrat));
      return this.router.navigate(['contrat-recu']);
    }, error => {
      alert(JSON.stringify(error));
    });
  }
  get f() { return this.compteForm.controls; }
  isAdmin() {
      if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
        return true;
      }
    }
}
