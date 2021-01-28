import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/auth.service';
import { takeUntil } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { NavigationService } from '../../../services/navigation.service';
import { Tab } from '../../../interfaces/sidebar.module';
import { navigationTabsList } from 'src/app/utils/static/sidbar-menu.data';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent extends AbstractDestroyable implements OnInit {
  isSidNavExtended: boolean = true;
  selectedTabId: number;
  selectedSubTabId: number;

  constructor(
    private sidebarService: SidebarService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router
    ) {
    super();
  }

  get tabsList(): Tab[] {
    return navigationTabsList;
  }

  get subTabsList(): Tab[] {
    const tab = navigationTabsList.find((baseTab) => baseTab.id === this.selectedTabId);
    return tab ? tab.subTabsList : [];
  }
  
  ngOnInit(): void {
    this.subscribeToNavigationState();
    this.subscribeSidNavState();
  }

  
  private subscribeToNavigationState(): void {
    this.navigationService.selectedTabState$
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((tabs: Tab[]) => {
        if (!tabs) {
          return;
        }

        this.selectedTabId = tabs.length ? tabs[0].id : 0;
        this.selectedSubTabId = tabs.length > 1 ? tabs[1].id : 0;
      });
  }

  private subscribeSidNavState(): void {
    this.sidebarService.currentState
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((state) => {
        this.isSidNavExtended = state;
      });
  }

  toggleSidenav(): void {
    this.sidebarService.setSidebarState(!this.isSidNavExtended);
  }
  
  setSidNavStatus(status: boolean): void {
    this.sidebarService.setSidebarState(status);
  }

  getParentUrl(): string {
    const tab = navigationTabsList.find((baseTab) => baseTab.id === this.selectedTabId);
    return tab ? tab.tabName : null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
