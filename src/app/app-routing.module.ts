import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component';
import {ListUsersComponent} from './pages/users/list-users/list-users.component';
import {AddUsersComponent} from './pages/users/add-users/add-users.component';
import {AddCompteComponent} from './pages/compte/add-compte/add-compte.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ListComptesComponent} from './pages/compte/list-comptes/list-comptes.component';
import {DefaultComponent} from './layout/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AddDepotComponent} from './pages/depot/add-depot/add-depot.component';
import {ListDepotComponent} from './pages/depot/list-depot/list-depot.component';
import {EditUserComponent} from './pages/users/edit-user/edit-user.component';
import {ListPartenaireComponent} from './pages/partenaire/list-partenaire/list-partenaire.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {UserPartenaireComponent} from './pages/partenaire/user-partenaire/user-partenaire.component';
import {ListUserPartenaireComponent} from './pages/partenaire/list-user-partenaire/list-user-partenaire.component';
import {PartenaireExistantComponent} from './pages/compte/partenaire-existant/partenaire-existant.component';
import {AddAffectationComponent} from './pages/affectation/add-affectation/add-affectation.component';
import {EnvoiComponent} from './pages/transaction/envoi/envoi.component';
import {RetraitComponent} from './pages/transaction/retrait/retrait.component';
import {PdfRecuComponent} from './pages/pdf-recu/pdf-recu.component';
import {ContratRecuComponent} from './pages/contrat-recu/contrat-recu.component';
import {ListeEnvoiComponent} from './pages/transaction/liste-envoi/liste-envoi.component';
import {ListeRetraitComponent} from './pages/transaction/liste-retrait/liste-retrait.component';
import {ListPartComponent} from "./pages/parts/list-part/list-part.component";
import {PayerPartComponent} from "./pages/parts/payer-part/payer-part.component";


const routes: Routes = [
  {path: 'login', component: ConnexionComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
   path: '', component: DefaultComponent, canActivate: [AuthGuardService],
    children: [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
    {path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuardService]},
    {path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuardService]},
    {path: 'add-comptes', component: AddCompteComponent, canActivate: [AuthGuardService]},
    {path: 'list-comptes', component: ListComptesComponent, canActivate: [AuthGuardService]},
    {path: 'partenaire-existant', component: PartenaireExistantComponent, canActivate: [AuthGuardService]},
    {path: 'add-depots', component: AddDepotComponent, canActivate: [AuthGuardService]},
    {path: 'add-user-partenaire', component: UserPartenaireComponent, canActivate: [AuthGuardService]},
    {path: 'list-user-partenaire', component: ListUserPartenaireComponent, canActivate: [AuthGuardService]},
    {path: 'list-depots', component: ListDepotComponent, canActivate: [AuthGuardService]},
    {path: 'list-partenaires', component: ListPartenaireComponent, canActivate: [AuthGuardService]},
    {path: 'edit/:id', component: EditUserComponent, canActivate: [AuthGuardService]},
    {path: 'add-affectations', component: AddAffectationComponent, canActivate: [AuthGuardService]},
    {path: 'envoi', component: EnvoiComponent, canActivate: [AuthGuardService]},
    {path: 'retrait', component: RetraitComponent, canActivate: [AuthGuardService]},
    {path: 'pdf-recu', component: PdfRecuComponent, canActivate: [AuthGuardService]},
    {path: 'contrat-recu', component: ContratRecuComponent, canActivate: [AuthGuardService]},
    {path: 'list-envois', component: ListeEnvoiComponent, canActivate: [AuthGuardService]},
    {path: 'list-retraits', component: ListeRetraitComponent, canActivate: [AuthGuardService]},
    {path: 'list-parts', component: ListPartComponent, canActivate: [AuthGuardService]},
    {path: 'payer-parts', component: PayerPartComponent, canActivate: [AuthGuardService]},
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
