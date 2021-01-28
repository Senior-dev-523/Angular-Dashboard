import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LanguageStateService {
    private currentStateSubject: BehaviorSubject<number>;
    public currentState: Observable<number>;

    constructor() {
        this.currentStateSubject = new BehaviorSubject<number>(null);
        this.currentState = this.currentStateSubject.asObservable();
    }

    public get currentStateValue(): any {
        return this.currentStateSubject.value;
    }

    setLanguageState(state: number) {
        this.currentStateSubject.next(state);
    }
}