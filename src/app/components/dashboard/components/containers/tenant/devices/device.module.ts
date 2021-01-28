import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { DevicesPageComponent } from './components/devices-page/devices-page.component';
import { EditDialog } from './components/edit-dialog/edit.dialog';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        DevicesPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        DevicesPageComponent
    ],
    providers: [],
    entryComponents: [EditDialog],
    bootstrap: [],
})
export class DeviceModule { }