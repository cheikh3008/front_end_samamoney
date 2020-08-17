import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  formConnexion: FormGroup;
  errorMessage: string;
  showLoading = false;
  constructor(private auth: AuthService, private route: Router, private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.formConnexion =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
    onSubmit() {
    const  user = {
      email: this.formConnexion.value.email,
      password: this.formConnexion.value.password,
    };
    this.auth.login(user).subscribe(
      data => {
        this.showLoading = true;
        return this.route.navigate(['/dashboard']);
      },
      error => {
       /* this.errorMessage = 'Email ou mot de passe incorrect';*/
        alert(JSON.stringify(error));
      });
  }
}
