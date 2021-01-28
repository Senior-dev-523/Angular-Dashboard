import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { StepNavigationComponent } from './container/step-navigation.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        StepNavigationComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        StepNavigationComponent
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class StepNavigationModule { }