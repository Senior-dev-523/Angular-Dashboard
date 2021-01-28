import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleriaComponent } from './galleria.component';
import { MenuComponent } from './menu/components/menu.component';

const routes: Routes = [
    {
        path: '', component: GalleriaComponent,
        children: [
            {
                path: 'menu', component: MenuComponent,
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GalleriaRoutingModule { }