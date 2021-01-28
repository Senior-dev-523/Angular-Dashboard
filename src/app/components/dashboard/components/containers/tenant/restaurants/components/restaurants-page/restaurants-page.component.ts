import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Restaurant } from '../../modules/restaurant.module';
import { defaultValue } from '../../utils/restaurants.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { EditDialog } from '../edit-dialog/edit.dialog';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: Restaurant[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'name'
  };
  displayedColumns: string[] = ['state', 'name', 'description', 'azioni'];
  gridColumns = [
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75 aling-sort-header', cell: (element: Restaurant) => element.state },
    { columnDef: 'name', header: 'Nome', type: 'string', styleClass: 'w-120', cell: (element: Restaurant) => element.name },
    { columnDef: 'description', header: 'Descrizione', type: 'string-center', styleClass: 'ww-60 aling-sort-header', cell: (element: Restaurant) => element.description },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Restaurant) => element },
  ];

  defaultValue: Restaurant = defaultValue;

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
        name: 'Portoghese',
        description: 'Raffinata cucina italiana in una cornice unica.',
        state: true,
      },
      {
        id: 2, 
        name: 'Stravinskij Bar',
        description: 'Un luogo iconico, vibrante ed accogliente.',
        state: true,
      },
      {
        id: 3, 
        name: 'Irene',
        description: 'Una vera esperienza culinaria toscana.',
        state: true,
      },
      {
        id: 4, 
        name: 'Irene Bar',
        description: 'Gli originali cocktail, creati con ingredienti e aromi autentici.',
        state: true,
      },
      {
        id: 5, 
        name: 'In Room Dining',
        description: 'I nostri servizi nel confort della tua camera.',
        state: true,
      },
      {
        id: 6, 
        name: 'Cielo Terrace',
        description: 'Terrazza con vista panoramica sulla Città Eterna.',
        state: true,
      },
    ];

    this.languages = [];
  }

  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((restaurant: Restaurant) => {
        if (restaurant) {
          this.create(restaurant);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, Restaurant> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '465px',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        type: 'create',
        formData: this.defaultValue
      }
    });
  }

  create(restaurant: Restaurant): void {
    this.gridStateService.setCreateState(restaurant);
  }

  openEditDialog(restaurant: Restaurant): MatDialogRef<EditDialog, Restaurant> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '465px',
      panelClass: 'dialog-container',
      data: {
        type: 'edit', 
        formData: restaurant
      }
    });
  }

  onEdit(restaurant: Restaurant): void {
    this.openEditDialog(restaurant)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((restaurant: Restaurant) => {
        if (restaurant)
          this.edit(restaurant);
      });
  }

  edit(restaurant: Restaurant): void {
    this.gridStateService.setUpdateState(restaurant);
  }

}
