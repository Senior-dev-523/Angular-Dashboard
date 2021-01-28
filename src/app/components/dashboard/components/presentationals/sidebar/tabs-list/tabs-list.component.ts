import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Tab } from '../../../../interfaces/sidebar.module';

const ICON_PATH = './assets/icons/';
const SLASH = '/';
const dashboard = 'Dashboard';

@Component({
  selector: 'tabs-list',
  templateUrl: './tabs-list.component.html',
  styleUrls: ['./tabs-list.component.css'],
})
export class TabsListComponent extends AbstractDestroyable implements OnInit {
  @Output() sidNavStatus = new EventEmitter<boolean>();
  @Input() isSidNavExtended: boolean;
  @Input() selectedTabId: number;
  @Input() tabsList: Tab[];
  @Input() parentUrl?: string;
  
  constructor() {
    super();
   }

  ngOnInit(): void { }

  getBaseTabIconPath(tab: Tab): string {
    return `${ ICON_PATH }${ tab.svgTabIconName }`;
  }

  sidebarToggle(menuItem: Tab): void {
     // toggle open sidebar if closed

  }

  getNavigatePath(link: string): string {
    if (this.parentUrl) {
      return `${SLASH}${this.parentUrl}${SLASH}${link}`
    }
    return `${SLASH}${link}`;
  }

  isTabSelected(tab: Tab): boolean {
    return tab.id === this.selectedTabId;
  };

}
