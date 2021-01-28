import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    private dataSubject: BehaviorSubject<any>;
    public dataState: Observable<any>;

    private createSubject: BehaviorSubject<any>;
    public create: Observable<any>;

    private createAndCloseSubject: BehaviorSubject<any>;
    public createAndClose: Observable<any>;

    private closeSubject: BehaviorSubject<boolean>;
    public close: Observable<boolean>;

    constructor() {
        this.dataSubject = new BehaviorSubject<any>(true);
        this.dataState = this.dataSubject.asObservable();

        this.createSubject = new BehaviorSubject<any>(null);
        this.create = this.createSubject.asObservable();

        this.createAndCloseSubject = new BehaviorSubject<any>(null);
        this.createAndClose = this.createAndCloseSubject.asObservable();

        this.closeSubject = new BehaviorSubject<any>(null);
        this.close = this.closeSubject.asObservable();
    }

    public get dataValue(): any {
        return this.dataSubject.value;
    }

    setDataState(state: any) {
        this.dataSubject.next(state);
    }

    public get createValue(): any {
        return this.createSubject.value;
    }

    setCreateState(state: any) {
        this.createSubject.next(state);
    }

    public get createAndCloseValue(): any {
        return this.createAndCloseSubject.value;
    }

    setCreateAndClose(state: any) {
        this.createAndCloseSubject.next(state);
    }
    
    public get closeValue(): boolean {
        return this.closeSubject.value;
    }

    setClose(state: boolean) {
        this.closeSubject.next(state);
    }
}