import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Scan } from '../../modules/scan.module';
import { Router } from '@angular/router';

@Component ({
    selector: 'app-scans-page',
    templateUrl: './scans-page.component.html',
    styleUrls: ['./scans-page.component.css']
})

export class ScansPageComponent implements OnInit {
    
    languages: [] = null;
    scanpageData: Scan[] = null;
    /* Grid Options */
    gridOption = {
        editButton: true,
        textSearchColumnName: 'tenantName'
    };
    displayedColumns: string[] = ['tenantName', 'dailyScan', 'weeklyScan', 'monthlyScan', 'lastScan'];
    gridColumns = [
        { columnDef: 'tenantName', header: 'Tenant Name', type: 'string', styleClass: 'mleft-15 w-75 aling-sort-header', cell: (element: Scan) => element.tenantName },
        { columnDef: 'dailyScan', header: 'Scansioni giornaliere', type: 'string-center', styleClass: 'w-120', cell: (element: Scan) => element.dailyScan },
        { columnDef: 'weeklyScan', header: 'Scansioni settimanali', type: 'string-center', styleClass: 'w-120', cell: (element: Scan) => element.weeklyScan },
        { columnDef: 'monthlyScan', header: 'Scansioni mensili', type: 'string-center', styleClass: 'w-120', cell: (element: Scan) => element.monthlyScan },
        { columnDef: 'lastScan', header: 'Ultima scansione', type: 'string-center', styleClass: 'w-75 aling-sort-header', cell: (element: Scan) => element.lastScan },
      ];

      defaultValue: Scan = null;

      constructor(
        private gridStateService: GridStateService,
        public dialog: MatDialog,
        private router: Router
      ) { }

      ngOnInit(): void {
        this.getScanPageData();
      }

      getScanPageData(): void {

        this.scanpageData = [
        {
            id: 1,
            tenantName: 'Adam Denisov', 
            dailyScan: '21', 
            weeklyScan: '21', 
            monthlyScan: '21',
            lastScan: '16/11/2020' 
        },
        {
            id: 2,
            tenantName: 'Adam Denisov', 
            dailyScan: '12', 
            weeklyScan: '12', 
            monthlyScan: '12',
            lastScan: '16/11/2020' 
        },
        {
            id: 3,
            tenantName: 'Adam Denisov', 
            dailyScan: '43', 
            weeklyScan: '43', 
            monthlyScan: '43',
            lastScan: '16/11/2020'
        },
        {
            id: 4,
            tenantName: 'Adam Denisov', 
            dailyScan: '12', 
            weeklyScan: '12', 
            monthlyScan: '12',
            lastScan: '16/11/2020' 
        },
        {
            id: 5,
            tenantName: 'Adam Denisov', 
            dailyScan: '21', 
            weeklyScan: '21', 
            monthlyScan: '21',
            lastScan: '16/11/2020'
        },
        {
            id: 6,
            tenantName: 'Adam Denisov', 
            dailyScan: '33', 
            weeklyScan: '33', 
            monthlyScan: '33',
            lastScan: '16/11/2020'
        }];
        
        this.languages = [];
      }
    
}