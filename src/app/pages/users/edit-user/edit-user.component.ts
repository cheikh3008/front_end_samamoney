import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import {MustMatch} from '../../../services/must-match.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  userForm: FormGroup;
  roles: any;
  selected: string;
  users: any;
  submitted = false;
  constructor(private route: ActivatedRoute,
              private usersService: UserService,
              private router: Router,
              private role: RoleService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
      passwordComfirm: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(5)]],
    }, {
      validator: MustMatch('password', 'passwordComfirm')
    });
    this.role.getRole().subscribe(data => {
      this.roles = data;
    });
    this.route.params.subscribe(params => {
      this.usersService.getId(params.id).subscribe(data => {
        this.userForm.patchValue(data);
        this.selected = this.userForm.value.role.libelle;
      });
    });
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
      role: `/api/roles/${this.userForm.value.role.id}`
    };
    this.usersService.update(this.route.snapshot.params.id, users).subscribe( data => {
      alert('Modification réussie avec succes');
      this.router.navigate(['/list-users']);
    }, error => {
      alert(error);
    });
  }
  get f() { return this.userForm.controls; }
}
