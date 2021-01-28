import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { ClientSettings } from '../../modules/client-settings.module';
import { State } from 'src/app/shared/models/state.model';
import { activeStates, defaultValue } from '../../utils/client-settings.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { EditDialog } from '../edit-dialog/edit.dialog';

@Component({
  selector: 'app-client-settings-page',
  templateUrl: './client-settings-page.component.html',
  styleUrls: ['./client-settings-page.component.css'],
})
export class ClientSettingsPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: ClientSettings[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'name'
  };
  displayedColumns: string[] = ['state','name', 'phone', 'lastLoginDate', 'azioni'];
  gridColumns = [
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75 aling-sort-header', cell: (element: ClientSettings) => element.state },
    { columnDef: 'name', header: 'Nome', type: 'string', styleClass: 'w-120', cell: (element: ClientSettings) => element.name },
    { columnDef: 'phone', header: 'Cellulare', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: ClientSettings) => element.phone },
    { columnDef: 'lastLoginDate', header: 'Ultimo Login', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: ClientSettings) => element.lastLoginDate },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: ClientSettings) => element },
  ];

  activeStates: State[] = activeStates;

  defaultValue: ClientSettings = defaultValue; 

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
        name: 'Some',
        phone: 'XXX-XXX-XX',
        lastLoginDate: '16/11/2020',
        role: 1,
        state: true,
        welcomePageType: 1,
        currencyType: 0,
        QRCodeURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Qr-uk-m-wikipedia.svg/1200px-Qr-uk-m-wikipedia.svg.png'
      },
      {
        id: 2, 
        name: 'Some 1',
        phone: 'XXX-XXX-XX',
        lastLoginDate: '16/11/2020',
        role: 1,
        state: true,
        welcomePageType: 2,
        currencyType: 1,
        QRCodeURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Qr-uk-m-wikipedia.svg/1200px-Qr-uk-m-wikipedia.svg.png'
      },
      {
        id: 4, 
        name: 'Some 2',
        phone: 'XXX-XXX-XX',
        lastLoginDate: '16/11/2020',
        role: 1,
        state: true,
        welcomePageType: 4,
        currencyType: 1,
        QRCodeURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Qr-uk-m-wikipedia.svg/1200px-Qr-uk-m-wikipedia.svg.png'
      }
    ];

    this.languages = [];
  }

  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language: ClientSettings) => {
        if (language) {
          this.create(language);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, ClientSettings> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '600px',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        type: 'create',
        formData: this.defaultValue
      }
    });
  }

  create(language: ClientSettings): void {
    this.gridStateService.setCreateState(language);
  }

  openEditDialog(language: ClientSettings): MatDialogRef<EditDialog, ClientSettings> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '600px',
      panelClass: 'dialog-container',
      data: {
        type: 'edit', 
        formData: language
      }
    });
  }

  onEdit(language: ClientSettings): void {
    this.openEditDialog(language)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language: ClientSettings) => {
        if (language)
          this.edit(language);
      });
  }

  edit(language: ClientSettings): void {
    this.gridStateService.setUpdateState(language);
  }

}
