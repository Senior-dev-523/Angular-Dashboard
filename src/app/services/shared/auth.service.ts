import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private currentStateSubject: BehaviorSubject<boolean>;
    public currentState: Observable<boolean>;

    constructor() {
        this.currentStateSubject = new BehaviorSubject<boolean>(true);
        this.currentState = this.currentStateSubject.asObservable();
    }

    public get currentStateValue(): boolean {
        return this.currentStateSubject.value;
    }

    setSidebarState(state: boolean) {
        this.currentStateSubject.next(state);
    }

}