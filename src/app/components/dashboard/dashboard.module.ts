import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

/*  Dashboard */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

/* Sidebar */
import { SidebarComponent } from './components/presentationals/sidebar/sidebar.component';
import { TabsListComponent } from './components/presentationals/sidebar/tabs-list/tabs-list.component';
import { NavbarComponent } from './components/presentationals/navbar/navbar.component';
import { NavbarInherentComponent } from './components/presentationals/navbar-inherent/navbar-inherent.component';


/* imports libs */
import { InlineSVGModule } from 'ng-inline-svg';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        TabsListComponent,
        NavbarComponent,
        NavbarInherentComponent
    ],
    imports: [
        RouterModule,
        DashboardRoutingModule,
        SharedModule,
        RxReactiveFormsModule,
        InlineSVGModule.forRoot(),
    ],
    providers: [],
    bootstrap: [],
})
export class dashboard { }