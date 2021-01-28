import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';

@Component({
  selector: 'app-client-creation',
  templateUrl: './client-creation.component.html',
  styleUrls: ['./client-creation.component.css'],
})
export class ClientCreationComponent extends AbstractDestroyable implements OnInit {
  readonly isLoading$ = new BehaviorSubject(false);

  constructor() { 
    super();
  }

  ngOnInit(): void {

  }
  
}
