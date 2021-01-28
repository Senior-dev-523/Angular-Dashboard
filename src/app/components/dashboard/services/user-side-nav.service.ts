import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserSidenavService {
    private toggleStateSubject: BehaviorSubject<boolean>;
    public toggleState: Observable<boolean>;

    constructor() {
        this.toggleStateSubject = new BehaviorSubject<boolean>(null);
        this.toggleState = this.toggleStateSubject.asObservable();
    }

    public get toggleStateValue(): any {
        return this.toggleStateSubject.value;
    }

    toggleSidenav(state: boolean) {
        this.toggleStateSubject.next(state);
    }
}