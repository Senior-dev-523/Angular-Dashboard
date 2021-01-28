import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from '../../../../users/components/users-page/users-page.component';
import { DetailsFormComponent } from '../../../../users/components/details-form/details-form.component';
import { LanguagesPageComponent } from '../../../../language/components/language-page/language-page.component';
import { ClientsPageComponent } from '../clients-page/clients-page.component';
import { ClienAccountComponent } from './../../shared/client-account/container/client-account.component';
import { DetalesPageComponent } from './detales-page/detales-page.component';
import { RestaurantsPageComponent } from '../../../../restaurants/components/restaurants-page/restaurants-page.component';
import { ClientSettingsPageComponent } from '../../../../client-settings/components/client-settings/client-settings-page.component';
import { SoftwareModulesPageComponent } from '../../../../software-modules/components/software-modules-page/software-modules-page.component';
import { DevicesPageComponent } from '../../../../devices/components/devices-page/devices-page.component';
import { DocumentsPageComponent } from '../../../../documents/components/documents-page/documents-page.component';

const routes: Routes = [
    {
        path: '',  component: DetalesPageComponent,
        children: [
            { path: '', redirectTo: 'account' },
            {
                path: 'account', component: ClienAccountComponent,
            },
            {
                path: 'users', component: UsersPageComponent,
            },
            {  
                path: 'user-details', component: DetailsFormComponent 
            },
            {
                path: 'language', component: LanguagesPageComponent,
            },
            {
                path: 'restaurants', component: RestaurantsPageComponent,
            },
            {
                path: 'client-settings', component: ClientSettingsPageComponent,
            },
            {
                path: 'software-modules', component: SoftwareModulesPageComponent,
            },
            {
                path: 'devices', component: DevicesPageComponent,
            },
            {
                path: 'documents', component: DocumentsPageComponent,
            }
        ]
    },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientDetalesRoutingModule { } 
