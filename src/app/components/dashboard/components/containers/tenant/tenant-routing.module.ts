import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { ClientsPageComponent } from './clients/components/containers/clients-page/clients-page.component';
import { StylesPageComponent } from './styles/components/styles-page/styles-page.component';
import { StylesDetailsFormComponent } from './styles/components/details-form/styles-details-form.component';
import { UsersPageComponent } from './users/components/users-page/users-page.component';
import { DetailsFormComponent } from './users/components/details-form/details-form.component';
import { DocumentsPageComponent } from './documents/components/documents-page/documents-page.component';
import { ClientCreationComponent } from './clients/components/containers/client-creation/client-creation.component';

const routes: Routes = [
    {
        path: '', component: TenantComponent,
        children: [
            {
                path: 'users', component: UsersPageComponent,
            },
            {
                path: 'user-details', component: DetailsFormComponent,
            },  
            {
                path: 'styles', component: StylesPageComponent,
            },
            {
                path: 'styles-details', component: StylesDetailsFormComponent,
            },
            {
                path: 'documents', component: DocumentsPageComponent,
            },
            {
                path: 'clients', component: ClientsPageComponent,
            },
            {
                path: 'client-creation', component: ClientCreationComponent,
            },
            {
                path: 'client-details',
                loadChildren: () => import('./clients/components/containers/client-details/client-detales.module').then(m => m.ClientDetalesModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantRoutingModule { } 
