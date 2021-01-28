import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { SoftwareModulesPageComponent } from './components/software-modules-page/software-modules-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditDialog } from './components/edit-dialog/edit.dialog';

@NgModule({
    declarations: [
        SoftwareModulesPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        SoftwareModulesPageComponent
    ],
    providers: [],
    entryComponents: [EditDialog],
    bootstrap: [],
})
export class SoftwareModulesModule { }
