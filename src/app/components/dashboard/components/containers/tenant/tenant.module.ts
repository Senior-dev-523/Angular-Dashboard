import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TenantRoutingModule } from './tenant-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TenantComponent } from './tenant.component';
import { ClientsPageComponent } from './clients/components/containers/clients-page/clients-page.component';
import { ClientCreationComponent } from './clients/components/containers/client-creation/client-creation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StepNavigationModule } from './clients/components/shared/step-navigation/step-navigation.module';
import { ClientAccountModule } from './clients/components/shared/client-account/client-account.module';
import { DocumentsModule } from './documents/documents.module';
import { UserModule } from './users/user.module';
import { StylesModule } from './styles/styles.module';

@NgModule({
    declarations: [
        TenantComponent,
        ClientsPageComponent,
        ClientCreationComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        TenantRoutingModule,
        RxReactiveFormsModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        StepNavigationModule,
        ClientAccountModule,
        DocumentsModule,
        UserModule,
        StylesModule
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class MenuModule { }