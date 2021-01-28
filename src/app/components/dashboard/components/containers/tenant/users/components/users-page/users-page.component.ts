import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';

import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { DeleteGridItemDialog } from 'src/app/shared/components/delete-grid-item/delete-grid-item.dialog';
import { User } from '../../modules/user.module';
import { EditorDialog } from 'src/app/shared/components/dialogs/editor/editor.dialog';
import { State } from 'src/app/shared/models/state.model';
import { activeStates } from '../../utils/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: User[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'name'
  };
  displayedColumns: string[] = ['state', 'name', 'cellPhone', 'role', 'lastLogin', 'azioni'];
  gridColumns = [
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75 aling-sort-header', cell: (element: User) => element.state },
    { columnDef: 'name', header: 'Nome', type: 'string', styleClass: 'w-120', cell: (element: User) => element.name },
    { columnDef: 'cellPhone', header: 'Cellulare', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: User) => element.cellPhone },
    { columnDef: 'role', header: 'Tipo', type: 'string-center', styleClass: 'w-100 aling-sort-header', cell: (element: User) => element.role },
    { columnDef: 'lastLogin', header: 'Ultimo Login', type: 'string-center', styleClass: 'w-75 aling-sort-header', cell: (element: User) => element.lastLogin },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: User) => element },
  ];

  activeStates: State[] = activeStates;

  defaultValue: User = null; // { ... }

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
    this.pageData = [{
      id: 3,
      state: true, 
      name: 'Francesco Fileccia',
      cellPhone: '333/1234567', 
      role: 1, 
      lastLogin: '16/11/2020', 
    },
    {
      id: 4,
      state: true, 
      name: 'Giulo Mastrota',
      cellPhone: '333/1245789', 
      role: 2, 
      lastLogin: '16/11/2020', 
    },
    {
      id: 5,
      state: false, 
      name: 'Alessandro',
      cellPhone: '333/1245789', 
      role: 1, 
      lastLogin: '16/11/2020', 
    }];
    this.languages = [];
  }

  onCreate(): void {
    if (this.pagePosition === userPagePositions.CLIENT) {
      this.router.navigate(['/tenant/client-details/user-details']);
      return;
    }
    this.router.navigate(['/tenant/user-details']);
  }

  onEdit(user: User): void {
    if (this.pagePosition === userPagePositions.CLIENT) {
      this.router.navigate(['/tenant/client-details/user-details']);
      return;
    }
    this.router.navigate(['/tenant/user-details'] );
  }

}
