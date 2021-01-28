import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientDetalesRoutingModule } from './client-detales-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalesPageComponent } from './detales-page/detales-page.component';
import { StepNavigationModule } from '../../shared/step-navigation/step-navigation.module';
import { ClientAccountModule } from '../../shared/client-account/client-account.module';
import { UserModule } from '../../../../users/user.module';
import { LanguagesModule } from '../../../../language/language.module';
import { RestaurantsModule } from '../../../../restaurants/restaurant.module';
import { ClientSettingsModule } from '../../../../client-settings/client-settings.module';
import { SoftwareModulesModule } from '../../../../software-modules/software-modules.module';
import { DeviceModule } from '../../../../devices/device.module';
import { DocumentsModule } from '../../../../documents/documents.module';

@NgModule({
    declarations: [
       DetalesPageComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        ClientDetalesRoutingModule,
        RxReactiveFormsModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        StepNavigationModule,
        ClientAccountModule,
        UserModule,
        LanguagesModule,
        RestaurantsModule,
        ClientSettingsModule,
        SoftwareModulesModule,
        DeviceModule,
        DocumentsModule
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class ClientDetalesModule { }
