import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { ClientSettingsPageComponent } from './components/client-settings/client-settings-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditDialog } from './components/edit-dialog/edit.dialog';

@NgModule({
    declarations: [
        ClientSettingsPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        ClientSettingsPageComponent
    ],
    providers: [],
    entryComponents: [EditDialog],
    bootstrap: [],
})
export class ClientSettingsModule { }