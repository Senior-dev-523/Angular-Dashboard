import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { ClienAccountComponent } from './container/client-account.component';
import { GeneralInformationsFormComponent } from './presentationals/general-informations-form/general-informations-form.component';
import { OtherFormComponent } from './presentationals//other-form/other-form.component';
import { TenantFormComponent } from './presentationals/tenant-form/tenant-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
    declarations: [
        ClienAccountComponent,
        GeneralInformationsFormComponent,
        TenantFormComponent,
        OtherFormComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        RxReactiveFormsModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        ClienAccountComponent
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class ClientAccountModule { }