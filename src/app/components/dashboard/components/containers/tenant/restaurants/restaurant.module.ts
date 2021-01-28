import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { RestaurantsPageComponent } from './components/restaurants-page/restaurants-page.component';
import { EditDialog } from './components/edit-dialog/edit.dialog';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        RestaurantsPageComponent,
        EditDialog
    ],
    imports: [
        RouterModule,
        SharedModule,
        InlineSVGModule.forRoot(),
        NgbModule
    ],
    exports: [
        RestaurantsPageComponent,
        EditDialog
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})
export class RestaurantsModule { }