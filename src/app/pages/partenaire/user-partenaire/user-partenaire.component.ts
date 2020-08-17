import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import {PartenaireService} from '../../../services/partenaire.service';
import {MustMatch} from '../../../services/must-match.service';

@Component({
  selector: 'app-user-partenaire',
  templateUrl: './user-partenaire.component.html',
  styleUrls: ['./user-partenaire.component.css']
})
export class UserPartenaireComponent implements OnInit {
  userForm: FormGroup;
  roles: any;
  rolesbd: string;
  submitted = false;
  constructor(private ps: PartenaireService, private router: Router, private role: RoleService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
      passwordComfirm: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
    },  {
      validator: MustMatch('password', 'passwordComfirm')
    });
    this.role.getRole().subscribe(data => {
      this.roles = data;
    });
     this.rolesbd = JSON.parse(localStorage.getItem('roles'));
  }
  onSubmitForm() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const  users = {
      prenom: this.userForm.value.prenom,
      nom: this.userForm.value.nom,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: this.userForm.value.role
    };
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.ps.addUserPartenaire(users).subscribe(data => {
      alert('L\'utilisateur a été bien ajouté ');
      return this.router.navigate(['/list-user-partenaire']);
    }, error => {
        alert(JSON.stringify(error));
    });
  }
  get f() { return this.userForm.controls; }
  isPartenaire() {
      if ( this.rolesbd[0] === 'ROLE_PARTENAIRE' || this.rolesbd[0] === 'ROLE_ADMIN_PARTENAIRE') {
        return true;
      }
    }
}
