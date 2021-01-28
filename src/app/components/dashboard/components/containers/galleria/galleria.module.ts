import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GalleriaRoutingModule } from "./galleria-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from 'ng-inline-svg';
import { GalleriaComponent } from "./galleria.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuComponent } from './menu/components/menu.component';

@NgModule({
    declarations: [
        GalleriaComponent,
        MenuComponent,
    ],
    imports: [
        RouterModule,
        NgbModule,
        SharedModule,
        GalleriaRoutingModule,
        InlineSVGModule.forRoot(),
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})

export class GalleriaModule {}