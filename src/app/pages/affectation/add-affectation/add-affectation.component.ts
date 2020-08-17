import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import {AffectationService} from '../../../services/affectation.service';
import {UserService} from '../../../services/user.service';
import {PartenaireService} from '../../../services/partenaire.service';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.css']
})
export class AddAffectationComponent implements OnInit {
  afeectationForm: FormGroup;
  compte: any;
  user: any;
  submitted = false;
  constructor(private affaction: AffectationService,
              private router: Router,
              private ps: PartenaireService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.afeectationForm = this.formBuilder.group({
      user: ['', Validators.required],
      compte: ['', Validators.required],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', Validators.required],
    });
    this.ps.getCompte().subscribe(data => {
      this.compte = data;
    }),
      this.ps.getUserPartenaireAffectation().subscribe(data => {
      this.user = data;
    });

  }
  onSubmitForm() {
    this.submitted = true;
    if (this.afeectationForm.invalid) {
      return;
    }
    const  affectation = {
      user: `/api/users/${this.afeectationForm.value.user}`,
      compte: `/api/comptes/${this.afeectationForm.value.compte}`,
      dateDebut: this.afeectationForm.value.dateDebut,
      dateFin: this.afeectationForm.value.dateFin,
    };
    this.affaction.affectation(affectation).subscribe(data => {
      alert(JSON.stringify(data));
      return this.router.navigate(['/dashboard']);
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  get f() { return this.afeectationForm.controls; }
}
