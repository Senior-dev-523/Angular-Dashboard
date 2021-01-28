import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from './components/dashboard/services/navigation.service';
import { navigationTabsList } from 'src/app/utils/static/sidbar-menu.data';
import { Tab } from './components/dashboard/interfaces/sidebar.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit() {
   // this.router.navigate(['/auth']);
    this.subscribeRouterEventChanges();
  }

  private subscribeRouterEventChanges(): void {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.findLocation(route.url);
      }
    });
  }

  findLocation(currentUrl: string): void {
    const url = currentUrl.split('/').filter((url: string) => url !== '')

    if (!url.length) {
      return;
    }
    
    const res = this.getCurrentLocation(navigationTabsList, url, []);
    this.navigationService.setTabState(res);
  }

  getCurrentLocation(navTabsList: Tab[], urlNames: string[], resoultArray: Tab[]): Tab[] {
    if(!urlNames.length) {
      return resoultArray;
    }

    for (const navTab of navTabsList) {
      for (const urlName of urlNames) {
        if (navTab.tabName === urlName) {
          resoultArray = [... resoultArray, navTab];

          if (!navTab.subTabsList) {
            return resoultArray;
          }

          const urls = urlNames.filter(url => url !== urlName);
          return this.getCurrentLocation(navTab.subTabsList, urls, resoultArray);
        }
      }
    }

    for (const navTab of navTabsList) {
      if (!navTab.subTabsList) {
        break;
      }

      const res = [...this.getCurrentLocation(navTab.subTabsList, urlNames, resoultArray)];
      
      if (res.length > resoultArray.length) {
        resoultArray = [...resoultArray, navTab];
        return this.getCurrentLocation(navTab.subTabsList, urlNames, resoultArray);
      }
      
    }

    return resoultArray;
  }
}
