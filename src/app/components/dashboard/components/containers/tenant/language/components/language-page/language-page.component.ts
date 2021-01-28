import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Language } from '../../modules/language.module';
import { State } from 'src/app/shared/models/state.model';
import { activeStates, defaultLocalization } from '../../utils/language.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { EditDialog } from '../edit-dialog/edit.dialog';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.css'],
})
export class LanguagesPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: Language[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'name'
  };
  displayedColumns: string[] = ['state', 'imageURL', 'language', 'default', 'azioni'];
  gridColumns = [ 
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75 aling-sort-header', cell: (element: Language) => element.active },
    { columnDef: 'imageURL', header: 'Immagine', type: 'image', styleClass: 'w-120 aling-sort-header', cell: (element: Language) => element.imageURL },
    { columnDef: 'language', header: 'Lingua', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Language) => element.language },
    { columnDef: 'default', header: 'Lingua di Default', type: 'bool', styleClass: 'w-100 aling-sort-header', cell: (element: Language) => element.default },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Language) => element },
  ];

  activeStates: State[] = activeStates;

  defaultValue: Language = defaultLocalization; // { ... }

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

  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language: Language) => {
        if (language) {
          this.create(language);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, Language> {
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

  create(language: Language): void {
    this.gridStateService.setCreateState(language);
  }

  openEditDialog(language: Language): MatDialogRef<EditDialog, Language> {
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

  onEdit(language: Language): void {
    this.openEditDialog(language)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language: Language) => {
        if (language)
          this.edit(language);
      });
  }

  edit(language: Language): void {
    this.gridStateService.setUpdateState(language);
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
        language: 'Portoghese',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
        default: true,
        active: true,
      },
      {
        id: 2, 
        language: 'Italiano',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
        default: false,
        active: true,
      },
      {
        id: 3, 
        language: 'Russo',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
        default: false,
        active: true,
      },
      {
        id: 4, 
        language: 'Francese',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg',
        default: false,
        active: true,
      },
      {
        id: 5, 
        language: 'Tedesco',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
        default: false,
        active: true,
      },
      {
        id: 6, 
        language: 'Americano',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
        default: false,
        active: true,
      }
    ];

    this.languages = [];
  }

}
