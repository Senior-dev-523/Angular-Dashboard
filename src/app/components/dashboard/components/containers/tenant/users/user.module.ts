import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsFormComponent } from './components/details-form/details-form.component';

@NgModule({
    declarations: [
        UsersPageComponent,
        DetailsFormComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        UsersPageComponent,
        DetailsFormComponent
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class UserModule { }