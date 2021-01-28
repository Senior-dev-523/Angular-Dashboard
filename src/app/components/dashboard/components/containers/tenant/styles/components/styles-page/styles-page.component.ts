import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Style } from '../../modules/style.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';

@Component({
  selector: 'app-styles-page',
  templateUrl: './styles-page.component.html',
  styleUrls: ['./styles-page.component.css'],
})
export class StylesPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: Style[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    deleteButton: true,
    textSearchColumnName: 'name'
  };
  displayedColumns: string[] = [ 'name', 'description', 'azioni'];
  gridColumns = [
    { columnDef: 'name', header: 'Nome', type: 'string', styleClass: 'mleft-15 w-120 aling-sort-header', cell: (element: Style) => element.name },
    { columnDef: 'description', header: 'Descrizione', type: 'string', styleClass: 'w-120', cell: (element: Style) => element.description },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Style) => element },
  ];

  defaultValue: Style = null;

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
      name: 'Stile 1',
      description: 'colore bianco, colore rosso, colore verde',
      backgroundURL: '', 
      logoURL: '',
      logoSize: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      tenant: 0
    },
    {
      id: 2,
      name: 'Stile 2',
      description: 'colore bianco, colore rosso, colore verde',
      backgroundURL: '', 
      logoURL: '',
      logoSize: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      tenant: 0
    },
    {
      id: 3,
      name: 'Stile 3',
      description: 'colore bianco, colore rosso, colore verde',
      backgroundURL: '', 
      logoURL: '',
      logoSize: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      tenant: 0
    },
    {
      id: 4,
      name: 'Stile 4',
      description: 'colore bianco, colore rosso, colore verde',
      backgroundURL: '', 
      logoURL: '',
      logoSize: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      tenant: 0
    },
    {
      id: 5,
      name: 'Stile 5',
      description: 'colore bianco, colore rosso, colore verde',
      backgroundURL: '', 
      logoURL: '',
      logoSize: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      tenant: 0
    },
  ];

    this.languages = [];
  }

  onCreate(): void {
    this.router.navigate(['/tenant/styles-details']);
  }

  onEdit(user: Style): void {
    this.router.navigate(['/tenant/styles-details']);
  }

}
