import { Component, Inject, ChangeDetectionStrategy, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { EditorService } from 'src/app/services/shared/editor.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.dialog.html',
  styleUrls: ['editor.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDialog extends AbstractDestroyable {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;
  title = this.data.title;
  iconName = this.data.iconName; 
  savedItems = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EdditorData,
    public dialogRef: MatDialogRef<EditorDialog>,
    private resolver: ComponentFactoryResolver,
    private editorService: EditorService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    super();
  }

  ngAfterViewInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.container.createComponent(factory);
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.editorService.setDataState(this.data.resources);
    this.subscribeOnCloseEvent();
    this.subscribeOnCreateEvent();
    this.subscribeOnCreateEndCloseEvent();
  }

  private subscribeOnCreateEvent(): void {
    this.editorService.create.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((savedItems) => {
      if (!savedItems) {
        return;
      }
      this.savedItems = [...savedItems];
    });
  }

  private subscribeOnCreateEndCloseEvent(): void {
    this.editorService.createAndClose.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((savedItems) => {
      if (!savedItems) {
        return;
      }
      this.savedItems = [...savedItems];
      this.dialogRef.close(this.savedItems);
    });
  }

  private subscribeOnCloseEvent(): void {
    this.editorService.close.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((close: boolean) => {
      if (!close) {
        return;
      }
      this.onClose();
    });
  }

  onCreate(): void {
    this.editorService.setCreateState(true);
  }

  onClose(): void {
    this.dialogRef.close(this.savedItems);
  }

  ngOnDestroy(): void {
    this.editorService.setClose(null);
    this.editorService.setCreateState(null);
    this.editorService.setCreateAndClose(null);
  }

  get iconNameWithPath(): string {
    return `./assets/icons/${this.iconName}`;
  }
}

export interface EdditorData {
  resources: any;
  title: string;
  iconName: string;
  component;
}