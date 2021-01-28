import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { isString } from 'util';
import { takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { textFilter, statusFilter, updateArrayRecord, multiFilter } from 'src/app/utils/pure-functions';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { StatusStateService } from 'src/app/components/dashboard/services/status.service';
import { TextSearchStateService } from 'src/app/components/dashboard/services/textsearch.service';
// import { Language } from 'src/app/components/dashboard/interfaces/language.module';
import { LanguageStateService } from 'src/app/components/dashboard/services/language.service';
// import { Category } from 'src/app/components/dashboard/interfaces/category.module';
import { CategoriesStateService } from 'src/app/components/dashboard/services/categories.service';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';

const ICON_PATH = './assets/icons/';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent extends AbstractDestroyable implements OnInit  {
  
  @Input() gridOption;
  @Input() gridData: any[];
  @Input() gridColumns: any[];
  @Input() displayedColumns: any[];
  @Input() languages//: Language[];
  @Input() categories//: Category[];
  
  @Output() openEditDialog = new EventEmitter<number>();
  @Output() openDeleteDialog = new EventEmitter<number>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  filterData = [];
  selectedlanguage//: Language = null;
  dataSource: MatTableDataSource<any>;
  pageSizeOptions = 10;
  page = 1;

  constructor(
    public dialog: MatDialog,
    private gridStateService: GridStateService,
    private statusStateService: StatusStateService,
    private languageStateService: LanguageStateService,
    private textSearchStateService: TextSearchStateService,
    private categoriesStateService: CategoriesStateService,
  ) {
    super();
  }

  get currentPageSize(): number { 
    const dataSourceLength = this.dataSource.data.length;
    return dataSourceLength < this.pageSizeOptions? this.dataSource.data.length : this.pageSizeOptions;
  }

  ngOnInit(): void {
    this.initTable(this.gridData);
    this.addListener();
    this.editListener();
    this.deleteListener();
    this.languageStateChanges();
    this.listeningFilterValuesChanges();
  }

  initTable(data): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      let sortItem = data[sortHeaderId];
      if (isString(sortItem))
        return sortItem.toLocaleLowerCase();
      return sortItem;
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPage(page: number): void {
    this.paginator.pageIndex = page - 1;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  getCategory(categoty_id: number): string {
    const category = this.categories.filter((categoty) => categoty.id == categoty_id)[0];
    return category ? category.title : null;
  }

  setPageSizeOptions(pageSizeOptions: number): void {
    this.paginator.pageSize = pageSizeOptions;
    this.pageSizeOptions = pageSizeOptions;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  listeningFilterValuesChanges(): void {
    const textFilter$ = this.textSearchStateService.currentState;
    const statusFilter$ = this.statusStateService.currentState;
    const categoriesFilter$ = this.categoriesStateService.currentState;
    combineLatest(textFilter$, statusFilter$, categoriesFilter$).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(filter => {
      this.applyFilter(filter);
    });
  }

  languageStateChanges(): void {
    if(!this.languages) {
      return;
    }

    this.languageStateService.currentState
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((language_id: number) => {
        this.selectedlanguage = this.languages.find((language) => language.id == language_id);
      });
  }

  applyFilter(filter): void {
    if (!this.dataSource) { 
      return; 
    }

    this.filterData = filter;
    let gridData = this.gridData;
    let [text, status, categoriesId] = filter;

    const inputName = this.gridOption.textSearchColumnName;

    gridData = gridData.filter((item =>
      textFilter(item[inputName] ? item[inputName].toLowerCase() : '', text) &&
      statusFilter(item.online? item.online : item.state, status) &&
      multiFilter(item['categories'] ? item['categories'][0]: null, categoriesId) 
    ));
    this.dataSource.data = gridData;
  }

  addListener(): void {
    const create$ = this.gridStateService.create;
    create$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((items: any[]) => {
      if (items) {
        this.addItemsToGrid(items);
        this.applyFilter(this.filterData);
      }
    });
  }

  addItemsToGrid(items: any[]): void {
    items.forEach((item) => {
      this.dataSource.data = [item, ...this.dataSource.data];
      this.gridData = [item, ...this.gridData];
    });
  }

  editListener(): void {
    const update$ = this.gridStateService.update;
    update$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((items: any[]) => {
      if (items) {
        this.editGridItems(items);
        this.applyFilter(this.filterData);
      }
    });
  }

  editGridItems(items: any[]): void {
    items.forEach(category => {
      this.dataSource.data = updateArrayRecord(this.dataSource.data, category);
      this.gridData = updateArrayRecord(this.gridData, category);
    });
  }

  deleteListener(): void {
    const delete$ = this.gridStateService.delete;
    delete$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((data) => {
      if (data) {
        const id = data.id;
        this.dataSource.data = this.dataSource.data.filter((item) => item.id !== id);
        this.gridData = this.gridData.filter((item) => item.id !== id);
      }
    });
  }

  onDelete(item_id: number): void {
    this.openDeleteDialog.emit(item_id);
  }

  onEdit(row): void {
    this.openEditDialog.emit(row);
  }

  onRestore(row): void {

  }

  getBaseTabIconPath(name: string): string {
    return `${ ICON_PATH }${name}`;
  }

  ngOnDestroy(): void {
    this.gridStateService.setCreateState(null);
    this.gridStateService.setUpdateState(null);
    this.gridStateService.setDeleteState(null);
    this.textSearchStateService.setTextSearchState(null);
    this.categoriesStateService.setCategoriesState(null);
  }
}