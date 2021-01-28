import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GridStateService {
    private createSubject: BehaviorSubject<any>;
    public create: Observable<any>;

    private updateSubject: BehaviorSubject<any>;
    public update: Observable<any>;

    private deleteSubject: BehaviorSubject<any>;
    public delete: Observable<any>;
    
    constructor() {
        this.createSubject = new BehaviorSubject<any>(null);
        this.create = this.createSubject.asObservable();

        this.updateSubject = new BehaviorSubject<any>(null);
        this.update = this.updateSubject.asObservable();

        this.deleteSubject = new BehaviorSubject<any>(null);
        this.delete = this.deleteSubject.asObservable();
    }

    public get currentCreateValue(): any {
        return this.createSubject.value;
    }

    setCreateState(state: any) {
        this.createSubject.next(state);
    }

    public get updateCreateValue(): any {
        return this.updateSubject.value;
    }

    setUpdateState(state: any) {
        this.updateSubject.next(state);
    }

    public get currentDeleteValue(): any {
        return this.deleteSubject.value;
    }

    setDeleteState(state: any) {
        this.deleteSubject.next(state);
    }
}