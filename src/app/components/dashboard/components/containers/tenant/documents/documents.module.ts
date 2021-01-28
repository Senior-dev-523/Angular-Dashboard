import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { DocumentsPageComponent } from './components/documents-page/documents-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditDialog } from './components/edit-dialog/edit.dialog';

@NgModule({
    declarations: [
        DocumentsPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        DocumentsPageComponent,
        EditDialog
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class DocumentsModule { }