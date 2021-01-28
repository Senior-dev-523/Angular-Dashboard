import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';

import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { DeleteGridItemDialog } from 'src/app/shared/components/delete-grid-item/delete-grid-item.dialog';
import { SoftwareModules } from '../../modules/software-modules.module';
import { EditorDialog } from 'src/app/shared/components/dialogs/editor/editor.dialog';
import { State } from 'src/app/shared/models/state.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { EditDialog } from '../edit-dialog/edit.dialog';
import { defaultValue } from '../../utils/software-modulesr.data';

@Component({
  selector: 'app-software-modules-page',
  templateUrl: './software-modules-page.component.html',
  styleUrls: ['./software-modules-page.component.css'],
})
export class SoftwareModulesPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: SoftwareModules[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'description'
  };
  displayedColumns: string[] = ['description', 'type', 'value', 'azioni'];
  gridColumns = [
    { columnDef: 'description', header: 'Descrizione', type: 'string', styleClass: 'mleft-15 w-120 aling-sort-header', cell: (element: SoftwareModules) => element.description },
    { columnDef: 'type', header: 'Tipo', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: SoftwareModules) => element.type },
    { columnDef: 'value', header: 'Valore', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: SoftwareModules) => element.value },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: SoftwareModules) => element },
  ];

  defaultValue: SoftwareModules = defaultValue;

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
        description: 'Digital Menu WEB APP',
        type: 'Numero', 
        value: '16/11/2020 21:23',
        featureIds: [1, 2]
      },
      {
        id: 2,
        description: 'Carta dei vini',
        type: 'Vero', 
        value: '16/11/2020 21:23',
        featureIds: [1]
      },
      {
        id: 3,
        description: 'Galleria',
        type: 'Falso', 
        value: '16/11/2020 21:23',
        featureIds: [1, 2, 3]
      },
      {
        id: 4,
        description: 'Impostazioni',
        type: 'Data', 
        value: '16/11/2020 21:23',
        featureIds: [1, 2]
      },
      {
        id: 5,
        description: 'Export',
        type: 'Numero', 
        value: '16/11/2020 21:23',
        featureIds: [1, 2]
      },
      {
        id: 6,
        description: 'Web App',
        type: 'Data', 
        value: '16/11/2020 21:23',
        featureIds: [1, 2]
      }
    ];
    this.languages = [];
  }

  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((softwareModule: SoftwareModules) => {
        if (softwareModule) {
          this.create(softwareModule);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, SoftwareModules> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '280px',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        type: 'create',
        formData: this.defaultValue
      }
    });
  }

  create(softwareModule: SoftwareModules): void {
    this.gridStateService.setCreateState(softwareModule);
  }

  openEditDialog(softwareModule: SoftwareModules): MatDialogRef<EditDialog, SoftwareModules> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '280px',
      panelClass: 'dialog-container',
      data: {
        type: 'edit', 
        formData: softwareModule
      }
    });
  }

  onEdit(language: SoftwareModules): void {
    this.openEditDialog(language)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((softwareModule: SoftwareModules) => {
        if (softwareModule)
          this.edit(softwareModule);
      });
  }

  edit(softwareModule: SoftwareModules): void {
    this.gridStateService.setUpdateState(softwareModule);
  }

}
