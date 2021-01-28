import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoriesStateService {
    private currentStateSubject: BehaviorSubject<number[]>;
    public currentState: Observable<number[]>;
    public baseURL = environment.baseUrl;

    constructor(private http: HttpClient) {
        this.currentStateSubject = new BehaviorSubject<number[]>(null);
        this.currentState = this.currentStateSubject.asObservable();
    }

    public get currentStateValue(): any {
        return this.currentStateSubject.value;
    }

    setCategoriesState(state: number[]) {
        this.currentStateSubject.next(state);
    }

}