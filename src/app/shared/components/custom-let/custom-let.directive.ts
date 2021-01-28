import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface ContextWithImplicit<T> {
  $implicit: T;
}

class LetContext<T> implements ContextWithImplicit<T> {
  constructor(private internalDirectiveInstance: CustomLetDirective<T>) {}

  /* istanbul ignore next */
  get $implicit(): T {
    return this.internalDirectiveInstance.customLet;
  }

  get customLet(): T {
    return this.internalDirectiveInstance.customLet;
  }
}

@Directive({
  selector: '[customLet]'
})
export class CustomLetDirective<T> {
  @Input() customLet: T;

  constructor(public viewContainer: ViewContainerRef, public templateRef: TemplateRef<any>) {
    this.viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
