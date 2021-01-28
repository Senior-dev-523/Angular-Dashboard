import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/auth.service';
import { combineLatest, Observable } from 'rxjs';
import { NavigationService } from '../../../services/navigation.service';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { takeUntil } from 'rxjs/operators';
import { Tab } from '../../../interfaces/sidebar.module';

const ICON_PATH = './assets/icons/';

@Component({
  selector: 'app-navbar-inherent',
  templateUrl: './navbar-inherent.component.html',
  styleUrls: ['./navbar-inherent.component.css'],

})
export class NavbarInherentComponent extends AbstractDestroyable implements OnInit {
  isExtended$: Observable<boolean> = this.sidebarService.currentState;
  titleText: string;
  selectedTabs: Tab[]
  constructor(
    private sidebarService: SidebarService,
    private navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.navigationService.selectedTabState$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((selectedTabs: Tab[]) => {
      if (!selectedTabs) {
        return;
      }
      this.selectedTabs = selectedTabs.slice(0, 2);
    });
  }

  getBaseTabIconPath(tab: Tab): string {
    return `${ ICON_PATH }${ tab.svgTabIconName }`;
  }
}
