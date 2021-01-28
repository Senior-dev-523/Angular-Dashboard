import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatusStateService {
    private currentStateSubject: BehaviorSubject<boolean>;
    public currentState: Observable<boolean>;

    constructor() {
        this.currentStateSubject = new BehaviorSubject<boolean>(null);
        this.currentState = this.currentStateSubject.asObservable();
    }

    public get currentStateValue(): any {
        return this.currentStateSubject.value;
    }

    setStatusState(state: boolean) {
        this.currentStateSubject.next(state);
    }
}