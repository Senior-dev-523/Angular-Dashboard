import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Tab } from '../interfaces/sidebar.module';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private selectedTabSubject: BehaviorSubject<Tab[]>;
    public selectedTabState$: Observable<Tab[]>;

    constructor() {
        this.selectedTabSubject = new BehaviorSubject<Tab[]>(null);
        this.selectedTabState$ = this.selectedTabSubject.asObservable();
    }

    public get tabState(): Tab[] {
        return this.selectedTabSubject.value;
    }

    setTabState(state: Tab[]): void {
        this.selectedTabSubject.next(state);
    }

}
