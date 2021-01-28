import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { userPagePositions } from 'src/app/components/dashboard/enums/plan.enum';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';

@Component({
  selector: 'app-detales-page',
  templateUrl: './detales-page.component.html',
  styleUrls: ['./detales-page.component.css'],
})
export class DetalesPageComponent extends AbstractDestroyable implements OnInit {
  readonly isLoading$ = new BehaviorSubject(false);
  selectedtab: string;

  constructor(private router: Router) { 
    super();
  }

  ngOnInit(): void { }

  navgateToUserPage(): void {
    this.selectedtab = 'users';
    this.router.navigate(['/tenant/client-details/users'], {queryParams:{ position: userPagePositions.CLIENT } } );
  }

  navgateToLanguagePage(): void {
    this.selectedtab = 'language';
    this.router.navigate(['/tenant/client-details/language']);
  }

  navgateToRestaurantsPage(): void {  
    this.selectedtab = 'restaurants';
    this.router.navigate(['/tenant/client-details/restaurants']);
  }

  navgateToSettingsPage(): void {
    this.selectedtab = 'client-settings';
    this.router.navigate(['/tenant/client-details/client-settings']);
  }

  navgateToSoftwareModulesPage(): void {
    this.selectedtab = 'software-modules';
    this.router.navigate(['/tenant/client-details/software-modules']);
  }

  navgateToDevicesPage(): void {
    this.selectedtab = 'devices';
    this.router.navigate(['/tenant/client-details/devices']);
  }

  navgateToDocumentsPage(): void {
    this.selectedtab = 'documents';
    this.router.navigate(['/tenant/client-details/documents']);
  }
}
