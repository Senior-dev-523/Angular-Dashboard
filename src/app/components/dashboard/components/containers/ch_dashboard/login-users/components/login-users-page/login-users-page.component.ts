import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../modules/user.module';
import { State } from 'src/app/shared/models/state.model';
import { tenantStates } from '../../utils/users.data';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-login-users-page',
    templateUrl: './login-users-page.component.html',
    styleUrls: ['./login-users-page.component.css']
})

export class LoginUsersPageComponent implements OnInit {
    
    languages: [] = null;
    userpageData: User[] = null;
    /* Grid Options */
    gridOption = {
        editButton: true,
        textSearchColumnName: 'tenantName'
    };
    displayedColumns: string[] = ['tenantName', 'name', 'email', 'date'];
    gridColumns = [
        { columnDef: 'tenantName', header: 'Tenant Name', type: 'string', styleClass: 'mleft-15 w-75 aling-sort-header', cell: (element: User) => element.tenantName },
        { columnDef: 'name', header: 'Name', type: 'string-center', styleClass: 'w-120', cell: (element: User) => element.name },
        { columnDef: 'email', header: 'e-mail', type: 'string-center', styleClass: 'w-120', cell: (element: User) => element.email },
        { columnDef: 'date', header: 'Data Ultimo Login', type: 'string-center', styleClass: 'w-75 aling-sort-header', cell: (element: User) => element.date },
      ];

      tenantStates: State[] = tenantStates;

      defaultValue: User = null;

      constructor(
        public dialog: MatDialog,
        private router: Router
      ) { }

      ngOnInit(): void {
        this.getUserPageData();
      }

      getUserPageData(): void {

        this.userpageData = [
        {
            id: 1,
            tenantName: 'La Bettolaccia', 
            name: 'Francesco Fileccia', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        },
        {
            id: 2,
            tenantName: 'Cavalluccio Marino', 
            name: 'Giuseppe', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        },
        {
            id: 3,
            tenantName: 'Bastimento', 
            name: 'Giulo Nardini', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        },
        {
            id: 4,
            tenantName: 'La Greca', 
            name: 'Fabio', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        },
        {
            id: 5,
            tenantName: 'La Rustichella', 
            name: 'Gianvito Coppola', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        },
        {
            id: 6,
            tenantName: 'Le Lumie', 
            name: 'Emanuele Russo', 
            email: 'example@mail.com', 
            date: '16/11/2020', 
        }];
        
        this.languages = [];
      }
    
}