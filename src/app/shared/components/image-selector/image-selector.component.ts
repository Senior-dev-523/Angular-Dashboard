import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const ICON_PATH = './assets/icons/';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ImageSelectorComponent implements OnInit {
  @ViewChild('file') file: ElementRef<HTMLElement>;
  @Output() onFileChanges = new EventEmitter<string>();
  @Output() imgURLChanges = new EventEmitter<any>();
  @Input() imgURL: any;

  public imagePath;
  public message: string;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
      /* upload image */
      // Code...
      /* upload image */
      this.ref.detectChanges();
    }
    this.onFileChanges.emit(files[0].name);
  }

  selectImage(): void {
    let el: HTMLElement = this.file.nativeElement;
    el.click();
  }

  unSelectImage(): void {
    this.imgURL = null;
  }

  getBaseTabIconPath(name: string): string {
    return `${ ICON_PATH }${name}`;
  }
}
