import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CHDashboardComponent } from './ch_dashboard.component';
import { LoginUsersPageComponent } from './login-users/components/login-users-page/login-users-page.component';
import { ScansPageComponent } from './scans/components/scans-page/scans-page.component';
import { DeadlinePageComponent } from './deadlines/components/deadline-page/deadline-page.component';

const routes: Routes = [
    {
        path: '', component: CHDashboardComponent,
        children: [
            {
                path: 'login-users', component: LoginUsersPageComponent,
            },
            {
                path: 'scans', component: ScansPageComponent,
            },
            {
                path: 'deadlines', component: DeadlinePageComponent,
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CHDashboardRoutingModule { }