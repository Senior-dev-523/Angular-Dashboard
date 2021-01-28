import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { LanguagesPageComponent } from './components/language-page/language-page.component';
import { EditDialog } from './components/edit-dialog/edit.dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
    declarations: [
        LanguagesPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        RxReactiveFormsModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        LanguagesPageComponent
    ],
    providers: [],
    entryComponents: [EditDialog],
    bootstrap: [],
})
export class LanguagesModule { }