import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Documents } from '../../modules/documents.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { defaultValue } from '../../utils/documents.data';
import { EditDialog } from '../edit-dialog/edit.dialog';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.css'],
})
export class DocumentsPageComponent extends AbstractDestroyable implements OnInit {
  pagePosition: string;
  languages: [] = null;
  pageData: Documents[] = null;

  /* Grid options */
  gridOption = {
    restoreButton: true,
    deleteButton: true,
    textSearchColumnName: 'invoiceNumber'
  };
  displayedColumns: string[] = ['attached', 'invoiceNumber', 'amount', 'invoiceDate', 'paid', 'azioni'];
  gridColumns = [
    { columnDef: 'attached', header: 'Allegato', type: 'attached', styleClass: 'w-75', cell: (element: Documents) => element.attached },
    { columnDef: 'invoiceNumber', header: 'Numero seriale', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Documents) => element.invoiceNumber },
    { columnDef: 'amount', header: 'Importo', type: 'price', styleClass: 'w-120 aling-sort-header', cell: (element: Documents) => element.amount },
    { columnDef: 'invoiceDate', header: 'Data Fattura', type: 'string-center', styleClass: 'w-120 aling-sort-header', cell: (element: Documents) => element.invoiceDate },
    { columnDef: 'paid', header: 'Pagato', type: 'bool', styleClass: 'w-120 aling-sort-header', cell: (element: Documents) => element.paid },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Documents) => element },
  ];

  defaultValue: Documents = defaultValue;

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
        attached: '',
        invoiceNumber: '1234',
        amount: 1999.20,
        invoiceDate: '16/11/2020',
        expiryDate: '',
        paid: true,
      },
      {
        id: 2, 
        attached: '',
        invoiceNumber: '1234',
        amount: 1999.20,
        invoiceDate: '16/11/2020',
        expiryDate: '',
        paid: false,
      },
      {
        id: 3, 
        attached: '',
        invoiceNumber: '1234',
        amount: 1999.20,
        invoiceDate: '16/11/2020',
        expiryDate: '',
        paid: true,
      },
      {
        id: 4, 
        attached: '',
        invoiceNumber: '1234',
        amount: 1999.20,
        invoiceDate: '16/11/2020',
        expiryDate: '',
        paid: false,
      },
      {
        id: 5, 
        attached: '',
        invoiceNumber: '1234',
        amount: 1999.20,
        invoiceDate: '16/11/2020',
        expiryDate: '',
        paid: true,
      },
    ];

    this.languages = [];
  }

  onCreate(): void {
    this.openCreateDialog()
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((document: Documents) => {
        if (document) {
          this.create(document);
        }
      });
  }

  openCreateDialog(): MatDialogRef<EditDialog, Documents> {
    return this.dialog.open(EditDialog, {
      width: '500px',
      height: '460px',
      panelClass: 'dialog-container',
      disableClose: true,
      data: {
        type: 'create',
        formData: this.defaultValue
      }
    });
  }

  create(document: Documents): void {
    this.gridStateService.setCreateState(document);
  }
}
