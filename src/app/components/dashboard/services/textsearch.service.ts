import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TextSearchStateService {
    private currentStateSubject: BehaviorSubject<string>;
    public currentState: Observable<string>;

    constructor() {
        this.currentStateSubject = new BehaviorSubject<string>('');
        this.currentState = this.currentStateSubject.asObservable();
    }

    public get currentStateValue(): any {
        return this.currentStateSubject.value;
    }

    setTextSearchState(state: string) {
        this.currentStateSubject.next(state);
    }
}