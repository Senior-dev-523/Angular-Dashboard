import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            {
                path: 'tenant',
                loadChildren: () => import('./components/containers/tenant/tenant.module').then(m => m.MenuModule),
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./components/containers/ch_dashboard/ch_dashboard.module').then(m => m.CHDashboardModule),
            },
            {
                path: 'galleria',
                loadChildren: () => import('./components/containers/galleria/galleria.module').then(m => m.GalleriaModule),
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { } 