import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Menu } from '../modules/menu.module';
import { Router } from '@angular/router';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';


@Component ({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
    
    languages: [] = null;
    menulistData: Menu[] = null;
    /* Grid Options */
    gridOption = {
        editButton: true,
        textSearchColumnName: 'name'
    };
    displayedColumns: string[] = ['name', 'created_time', 'modified_time', 'file_size'];
    gridColumns = [
        { columnDef: 'name', header: 'Name', type: 'string', styleClass: 'mleft-15 w-75 aling-sort-header', cell: (element: Menu) => element.name },
        { columnDef: 'created_time', header: 'Data creazione', type: 'string-center', styleClass: 'w-120', cell: (element: Menu) => element.created_time },
        { columnDef: 'modified_time', header: 'Data modifica', type: 'string-center', styleClass: 'w-120', cell: (element: Menu) => element.modified_time },
        { columnDef: 'file_size', header: 'File size', type: 'string-center', styleClass: 'w-75 aling-sort-header', cell: (element: Menu) => element.file_size },
    ];

    defaultValue: Menu = null;

    constructor(
        private gridStateService: GridStateService,
        public dialog: MatDialog,
        private router: Router
    ) {}
    
    ngOnInit(): void {
        this.getMenuListData ();
    }

    getMenuListData(): void {

        this.menulistData = [
            {
                id: 1,
                name: 'Documents',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: ''
            },
            {
                id: 2,
                name: 'CV.pdf',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '1.04MB'
            },
            {
                id: 3,
                name: 'Resume.pdf',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '1.04MB'
            },
            {
                id: 4,
                name: 'Picture.jpg',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '3.66MB'
            },
            {
                id: 5,
                name: 'Logo.png',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '3.66MB'
            },
            {
                id: 6,
                name: 'CV-V2',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '1.22MB'
            },
            {
                id: 7,
                name: 'Project.pdf',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: ''
            },
            {
                id: 8,
                name: 'Profile.jpg',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: ''
            },
            {
                id: 9,
                name: 'Downloads',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: ''
            },
            {
                id: 10,
                name: 'Nature.jpg',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: '1.02KB'
            },
            {
                id: 11,
                name: 'Documents',
                created_time: '16/11/2020',
                modified_time: '16/11/2020',
                file_size: ''
            },
        ];
        this.languages = [];
    }
}