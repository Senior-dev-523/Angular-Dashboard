import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Deadline } from '../../modules/deadline.module';
import { State } from 'src/app/shared/models/state.model';
import { tenantStates } from '../../utils/deadline.data';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-deadline-page',
    templateUrl: './deadline-page.component.html',
    styleUrls: ['./deadline-page.component.css']
})

export class DeadlinePageComponent implements OnInit {
    
    languages: [] = null;
    deadlinepageData: Deadline[] = null;
    /* Grid Options */
    gridOption = {
        editButton: true,
        textSearchColumnName: 'tenantName'
    };
    displayedColumns: string[] = ['tenantName', 'module', 'date'];
    gridColumns = [
        { columnDef: 'tenantName', header: 'Tenant Name', type: 'string', styleClass: 'mleft-15 w-75 aling-sort-header', cell: (element: Deadline) => element.tenantName },
        { columnDef: 'module', header: 'Modulo', type: 'string-center', styleClass: 'w-120', cell: (element: Deadline) => element.module },
        { columnDef: 'date', header: 'Data di scadenza', type: 'string-center', styleClass: 'w-75 aling-sort-header', cell: (element: Deadline) => element.date },
      ];

      tenantStates: State[] = tenantStates;

      defaultValue: Deadline = null;

      constructor(
        public dialog: MatDialog,
        private router: Router
      ) { }

      ngOnInit(): void {
        this.getDeadlinePageData();
      }

    getDeadlinePageData(): void {

        this.deadlinepageData = [
        {
            id: 1,
            tenantName: 'La Bettolaccia', 
            module: 'App Menu',
            date: '16/11/2020 13:00', 
        },
        {
            id: 2,
            tenantName: 'La Greca', 
            module: 'App Menu',
            date: '16/11/2020 14:00',  
        },
        {
            id: 3,
            tenantName: 'La Rustichella', 
            module: 'App Menu',
            date: '16/11/2020 15:00', 
        },
        {
            id: 4,
            tenantName: 'Casa Coppelle', 
            module: 'App Attività',
            date: '16/11/2020 00:00', 
        },
        {
            id: 5,
            tenantName: 'Bastimento', 
            module: 'App Attività',
            date: '16/11/2020 13:00',  
        },
        {
            id: 6,
            tenantName: 'Le Nuova Torre', 
            module: 'App Attività',
            date: '16/11/2020 13:00',  
        }];
        
        this.languages = [];
      }
    
}