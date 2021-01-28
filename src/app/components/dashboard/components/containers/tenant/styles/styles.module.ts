import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { StylesPageComponent } from './components/styles-page/styles-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StylesDetailsFormComponent } from './components/details-form/styles-details-form.component';
import { FileSelectDialog } from './components/file-select-dialog/file-select.dialog';

@NgModule({
    declarations: [
        StylesPageComponent,
        StylesDetailsFormComponent,
        FileSelectDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        StylesPageComponent,
        StylesDetailsFormComponent
    ],
    providers: [],
    entryComponents: [FileSelectDialog],
    bootstrap: [],
})
export class StylesModule { }