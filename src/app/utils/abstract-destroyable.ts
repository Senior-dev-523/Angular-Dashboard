import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

// TODO: Add Angular decorator.
@Directive()
export abstract class AbstractDestroyable implements OnDestroy {
  protected onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
