import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { billing, businessInformation } from '../../components/dashboard/interfaces/business.model';

@Injectable({
    providedIn: 'root'
})
export class AccountStateService {
    private billingSubject: BehaviorSubject<billing>;
    public billing: Observable<billing>;

    private businessSubject: BehaviorSubject<businessInformation>;
    public business: Observable<businessInformation>;

    private isAccountReadySubject: BehaviorSubject<boolean>;
    public isAccountReady: Observable<boolean>;

    private isBusinessReadySubject: BehaviorSubject<string>;
    public isBusinessReady: Observable<string>;

    private currentPageSubject: BehaviorSubject<string>;
    public currentPage: Observable<string>;

    private nextPageSubject: BehaviorSubject<boolean>;
    public nextPage: Observable<boolean>;

    constructor() {
        this.billingSubject = new BehaviorSubject<billing>(null);
        this.billing = this.billingSubject.asObservable();

        this.businessSubject = new BehaviorSubject<businessInformation>(null);
        this.business = this.businessSubject.asObservable();

        this.isAccountReadySubject = new BehaviorSubject<boolean>(null);
        this.isAccountReady = this.isAccountReadySubject.asObservable();

        this.isBusinessReadySubject = new BehaviorSubject<string>(null);
        this.isBusinessReady = this.isBusinessReadySubject.asObservable();

        this.currentPageSubject = new BehaviorSubject<string>(null);
        this.currentPage = this.currentPageSubject.asObservable();

        this.nextPageSubject = new BehaviorSubject<boolean>(null);
        this.nextPage = this.nextPageSubject.asObservable();
    }

    public get currentBillingValue(): billing {
        return this.billingSubject.value;
    }

    setBillingState(state: billing) {
        this.billingSubject.next(state);
    }

    public get currentBusinessValue(): businessInformation {
        return this.businessSubject.value;
    }

    setBusinessState(state: businessInformation) {
        this.businessSubject.next(state);
    }

    public get accountStatus(): boolean {
        return this.isAccountReadySubject.value;
    }

    setAccountState(state: boolean) {
        this.isAccountReadySubject.next(state);
    }

    public get businessFormStatus(): string {
        return this.isBusinessReadySubject.value;
    }

    setBusinessFormStatus(state: string) {
        this.isBusinessReadySubject.next(state);
    }

    public get currentPageStatus(): string {
        return this.currentPageSubject.value;
    }

    setCurrentPageValue(state: string) {
        this.currentPageSubject.next(state);
    }

    public get nextPageStatus(): boolean {
        return this.nextPageSubject.value;
    }

    goNextPage(state: boolean) {
        this.nextPageSubject.next(state);
    }
}