import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        AuthComponent,
        AuthFormComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        AuthRoutingModule,
        InlineSVGModule.forRoot(),
    ], providers: []
})
export class auth { }