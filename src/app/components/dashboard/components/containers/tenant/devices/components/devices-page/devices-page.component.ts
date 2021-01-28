import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Devices } from '../../modules/device.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { EditDialog } from '../edit-dialog/edit.dialog';
import { defaultValue } from '../../utils/device.data';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.css'],
})
export class DevicesPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: Devices[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'serialNumber'
  };
  displayedColumns: string[] = ['state', 'serialNumber', 'key', 'LoggedIn', 'lastLogin', 'azioni'];
  gridColumns = [
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75 aling-sort-header', cell: (element: Devices) => element.state },
    { columnDef: 'serialNumber', header: 'Numero seriale', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Devices) => element.serialNumber },
    { columnDef: 'key', header: 'Key', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Devices) => element.key },
    { columnDef: 'LoggedIn', header: 'Loggato', type: 'bool', styleClass: 'w-120 aling-sort-header', cell: (element: Devices) => element.LoggedIn },
    { columnDef: 'lastLogin', header: 'Ultimo Login', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Devices) => element.lastLogin },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Devices) => element },
  ];

  defaultValue: Devices = defaultValue;

  constructor(
    private gridStateService: GridStateService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { 
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      take(1),
      takeUntil(this.onDestroy$)
    ).subscribe((queryParams) => {
      if (!queryParams.position) {
        this.pagePosition = userPagePositions.DEFAULT;
        return;
      }

      this.pagePosition = queryParams.position;
    });

    this.getPageData();
  }

  getPageData(): void {
    /*
    const pageData$ = this.categoryService.getAllWithLocalizations();
    pageData$
      .subscribe(data => {
        this.languages = data['languages'];
        this.pageData = data['clients'];
    });
    */
    this.pageData = [
      {
        id: 1, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
      {
        id: 2, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
      {
        id: 3, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
      {
        id: 4, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
      {
        id: 5, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
      {
        id: 6, 
        key: '1k2g-9m123s456a78',
        serialNumber: 'AB123CD456-01',
        lastLogin: '16/11/2020',
        state: 1,
        LoggedIn: true,
        numberOfDevices: 1
      },
    ];

    this.languages = [];
  }


  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language: Devices) => {
        if (language) {
          this.create(language);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, Devices> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '290px',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        type: 'create',
        formData: this.defaultValue
      }
    });
  }

  create(devices: Devices): void {
    this.gridStateService.setCreateState(devices);
  }

  openEditDialog(devices: Devices): MatDialogRef<EditDialog, Devices> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '290px',
      panelClass: 'dialog-container',
      data: {
        type: 'edit', 
        formData: devices
      }
    });
  }

  onEdit(devices: Devices): void {
    this.openEditDialog(devices)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((devices: Devices) => {
        if (devices)
          this.edit(devices);
      });
  }

  edit(devices: Devices): void {
    this.gridStateService.setUpdateState(devices);
  }

}
