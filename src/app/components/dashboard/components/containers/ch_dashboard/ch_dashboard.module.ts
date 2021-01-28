import { RouterModule, Router } from "@angular/router";
import { CHDashboardRoutingModule } from "./ch_dashboard-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from 'ng-inline-svg';
import { CHDashboardComponent } from "./ch_dashboard.component";
import { NgModule } from "@angular/core";
import { LoginUsersPageComponent } from "./login-users/components/login-users-page/login-users-page.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { ScansPageComponent } from "./scans/components/scans-page/scans-page.component";
import { DeadlinePageComponent } from "./deadlines/components/deadline-page/deadline-page.component";

@NgModule({
    declarations: [
        CHDashboardComponent,
        LoginUsersPageComponent,
        ScansPageComponent,
        DeadlinePageComponent,
    ],
    imports: [
        RouterModule,
        CHDashboardRoutingModule,
        NgbModule,
        SharedModule,
        InlineSVGModule.forRoot(),
    ],
    providers: [],
    entryComponents: [],
    bootstrap: [],
})

export class CHDashboardModule {}