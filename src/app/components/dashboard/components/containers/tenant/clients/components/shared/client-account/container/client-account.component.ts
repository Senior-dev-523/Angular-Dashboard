import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { ClientAccountService } from '../services/client-account.service';

interface Step {
  id: number;

  isStepValid(): boolean;
}

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css'],
})
export class ClienAccountComponent extends AbstractDestroyable implements OnInit {
  isNextStepAvailable$: Observable<boolean>;
  currentStepId$: Observable<number>;
  currentStep$: Observable<Step>;
  clientAccount;

  readonly isLoading$ = new BehaviorSubject(false);

  private steps: Step[] = [
    {
      id: 1,
      isStepValid: () => this.clientAccount.tenant
    },
    {
      id: 2,
      isStepValid: () => this.clientAccount.general
    },
    {
      id: 3,
      isStepValid: () => true
    }
  ];

  constructor(
    private router: Router,
    private clientAccountService: ClientAccountService
    ) { 
    super();
  }
  
  ngOnInit(): void {
    this.initCurrentStep();
    this.initFlags();
    this.subscribeToClientSettings();
   }

   private initCurrentStep(): void {
    this.currentStepId$ = this.clientAccountService.currentStepId$;

    this.currentStep$ = this.currentStepId$.pipe(
      takeUntil(this.onDestroy$),
      map(currentStepId => this.steps.find(step => step.id === currentStepId))
    );
  }

  private initFlags(): void {
    this.isNextStepAvailable$ = combineLatest([this.currentStep$, this.isLoading$]).pipe(
      map(([currentStep, isLoading]) => currentStep.isStepValid() && !isLoading)
    );
  }

  private subscribeToClientSettings(): void {
    this.clientAccountService.clientAccount$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((clientAccount) => {
      if (!clientAccount) {
        return;
      }
      this.clientAccount = clientAccount;
    });
  }

  setTanat(tenant: any): void {
   this.clientAccountService.setNextStep();
   this.clientAccountService.setTenant(tenant);
  }

  setGeneral(general: any): void {
    this.clientAccountService.setNextStep();
    this.clientAccountService.setGeneral(general);
  }

  setOther(other: any): void {
    this.clientAccountService.setOther(other)
    this.router.navigate(['/tenant/clients']);
  }

}
