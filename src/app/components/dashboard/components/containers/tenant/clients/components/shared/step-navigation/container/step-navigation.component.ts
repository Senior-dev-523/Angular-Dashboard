import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { ClientAccountService } from '../../client-account/services/client-account.service';

@Component({
  selector: 'app-step-navigation',
  templateUrl: './step-navigation.component.html',
  styleUrls: ['./step-navigation.component.css'],
})
export class StepNavigationComponent extends AbstractDestroyable implements OnInit {
  @Input() isHorizontalView: boolean;
  clientAccount;

  constructor(private clientAccountService: ClientAccountService) {
    super();
   }

  ngOnInit(): void {
    this.subscribeToClientSettings();
    this.clientAccountService.initClientAccount();
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

  navigateToStep(stepId: number, isStepValid: boolean): void {
    if (!isStepValid) {
      return;
    }
    
    this.clientAccountService.setNextStep(stepId);
  }

}
