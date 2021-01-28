import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/auth.service';
import { Observable } from 'rxjs';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractDestroyable implements OnInit {
  isExtended$: Observable<boolean> = this.sidebarService.currentState;
  
  constructor(
    private sidebarService: SidebarService,
    ) {
    super();
  }

  ngOnInit(): void {
 
  }
}
