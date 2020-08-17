import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {PostComponent} from '../../modules/post/post.component';
import {SharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {ListUsersComponent} from '../../pages/users/list-users/list-users.component';
import {AddUsersComponent} from '../../pages/users/add-users/add-users.component';
import {AddCompteComponent} from '../../pages/compte/add-compte/add-compte.component';
import {AddDepotComponent} from '../../pages/depot/add-depot/add-depot.component';
import {ListComptesComponent} from '../../pages/compte/list-comptes/list-comptes.component';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ListDepotComponent} from '../../pages/depot/list-depot/list-depot.component';
import {EditUserComponent} from '../../pages/users/edit-user/edit-user.component';
import {ListPartenaireComponent} from '../../pages/partenaire/list-partenaire/list-partenaire.component';
import {PageNotFoundComponent} from '../../pages/page-not-found/page-not-found.component';
import {UserPartenaireComponent} from '../../pages/partenaire/user-partenaire/user-partenaire.component';
import {ListUserPartenaireComponent} from '../../pages/partenaire/list-user-partenaire/list-user-partenaire.component';
import {PartenaireExistantComponent} from '../../pages/compte/partenaire-existant/partenaire-existant.component';
import {AddAffectationComponent} from '../../pages/affectation/add-affectation/add-affectation.component';
import {EnvoiComponent} from '../../pages/transaction/envoi/envoi.component';
import {RetraitComponent} from '../../pages/transaction/retrait/retrait.component';
import {AppModule} from '../../app.module';
import {PdfRecuComponent} from '../../pages/pdf-recu/pdf-recu.component';
import {MatCardModule} from '@angular/material/card';
import {ContratRecuComponent} from '../../pages/contrat-recu/contrat-recu.component';
import {ListeEnvoiComponent} from '../../pages/transaction/liste-envoi/liste-envoi.component';
import {ListeRetraitComponent} from '../../pages/transaction/liste-retrait/liste-retrait.component';
import {ListPartComponent} from '../../pages/parts/list-part/list-part.component';
import {PayerPartComponent} from '../../pages/parts/payer-part/payer-part.component';




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostComponent,
    ListUsersComponent,
    AddUsersComponent,
    AddCompteComponent,
    AddDepotComponent,
    ListComptesComponent,
    ListDepotComponent,
    EditUserComponent,
    ListPartenaireComponent,
    PageNotFoundComponent,
    UserPartenaireComponent,
    ListUserPartenaireComponent,
    PartenaireExistantComponent,
    AddAffectationComponent,
    EnvoiComponent,
    RetraitComponent,
    PdfRecuComponent,
    ContratRecuComponent,
    ListeEnvoiComponent,
    ListeRetraitComponent,
    ListPartComponent,
    PayerPartComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        MatMenuModule,
        MatSidenavModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        _MatMenuDirectivesModule,
        MatInputModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
    ]
})
export class DefaultModule { }
