import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DilterSelectionDropdownComponent } from './components/filter-selection-dropdown/filter-selection-dropdown.component';
import { GridComponent } from './components/grid/grid.component';
import { GridHeaderComponent } from './components/grid-header/grid-header.component';
import { DeleteGridItemDialog } from './components/delete-grid-item/delete-grid-item.dialog';
import { ErrorDialog } from './components/error/error.dialog';
import { EditorDialog } from './components/dialogs/editor/editor.dialog';
import { LoadingComponent } from './components/loading/loading.component';
import { DataSearchComponent } from './components/data-search/data-search.component';
import { DataSelectStatusComponent } from './components/data-select-status/data-select-status.component';
import { EditorFooterComponent } from './components/editor-footer/editor-footer.component';

import { SelectDateComponent } from './components/form-components/select-date/select-date.component';

import { MaterialModule } from './modules/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CustomLetDirective } from './components/custom-let/custom-let.directive';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    InlineSVGModule.forRoot(),
  ],
  declarations: [
    GridComponent,
    GridHeaderComponent,
    DeleteGridItemDialog,
    ErrorDialog,
    LoadingComponent,
    DilterSelectionDropdownComponent,
    DataSearchComponent,
    DataSelectStatusComponent,
    EditorFooterComponent,
    SelectDateComponent,
    EditorDialog,
    CustomLetDirective,
    ImageSelectorComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GridComponent,
    GridHeaderComponent,
    LoadingComponent,
    DeleteGridItemDialog,
    ErrorDialog,
    DilterSelectionDropdownComponent,
    DataSearchComponent,
    DataSelectStatusComponent,
    EditorFooterComponent,
    SelectDateComponent,
    EditorDialog,
    CustomLetDirective,
    ImageSelectorComponent
  ],
  entryComponents: [
    DeleteGridItemDialog,
    EditorDialog,
    ErrorDialog,
  ]
})
export class SharedModule {}
