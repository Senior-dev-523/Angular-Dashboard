import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isExtended$: Observable<boolean> = this.sidebarService.currentState;
  userName: string;
  userSurname: string;
  userIn: string;

  get fullUserName(): string {
    return `${this.userName} ${this.userSurname}`;
  }
  
  constructor(
    private sidebarService: SidebarService
    ) { }

  ngOnInit(): void {
    this.setUserName();
  }

  onOpenUserSidebar(): void {
  }
  
  setUserName(): void {
    this.userName = localStorage.getItem('userName');
    this.userSurname = localStorage.getItem('userSurname');
    this.userIn = this.userName[0] +  this.userSurname[0];
  }
}
