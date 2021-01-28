import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

export interface ClientAccount {
    tenant: any,
    general: any,
    other: any
}

@Injectable({
    providedIn: 'root'
})
export class ClientAccountService {
    private currentStepIdSubject$ = new BehaviorSubject<number>(1);
    private clientAccountSubject: BehaviorSubject<ClientAccount>;
    private clientAccountData: ClientAccount = {
        tenant: null,
        general: null,
        other: null
    }

    constructor(private router: Router) {
        this.clientAccountSubject = new BehaviorSubject<ClientAccount>(this.clientAccountData);
    }

    get clientAccount$(): Observable<ClientAccount> {
        return this.clientAccountSubject.asObservable();
    }

    get currentStepId$(): Observable<number> {
        return this.currentStepIdSubject$.asObservable();
    }

    initClientAccount(): void {
        this.currentStepIdSubject$.next(1);
    }

    setNextStep(stepId: number = null) {
        if (!stepId) {
            this.currentStepIdSubject$.next(this.currentStepIdSubject$.value + 1);
            return;
        }

        this.currentStepIdSubject$.next(stepId);

        const URL = this.router.url.split('/').filter((url: string) => url !== '');
        const currentRoute = URL.slice(-1)[0];

        if (currentRoute !== 'account' && currentRoute !== 'client-creation' ) {
            this.router.navigate(['tenant/client-details/account']);
        }
    }

    setTenant(tenant: any): void {
        this.clientAccount$.pipe(take(1)).subscribe(clientAccount => {
            this.clientAccountSubject.next({
                ...clientAccount,
                tenant: 'tenant'
            });
        });
    }

    setGeneral(general): void {
        this.clientAccount$.pipe(take(1)).subscribe(clientAccount => {
            this.clientAccountSubject.next({
                ...clientAccount,
                general: 'general'
            });
        });
    }

    setOther(other): void {
        this.clientAccount$.pipe(take(1)).subscribe(clientAccount => {
            this.clientAccountSubject.next({
                ...clientAccount,
                other: 'other'
            });
        });
    }
}