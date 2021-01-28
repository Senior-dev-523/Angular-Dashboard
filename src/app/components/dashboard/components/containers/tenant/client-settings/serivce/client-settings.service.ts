import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { API_TOKEN } from 'src/app/utils/injectionToken';

@Injectable({
    providedIn: 'root'
})
export class ClientSettingsService {

    constructor(
        private http: HttpClient,
        @Inject(API_TOKEN) private api: string
    ) { }

    getAll(): Observable<any> {
        return;
      /*  return this.http.get(this.api + '')
            .pipe(map(res => {
                const { content } = res['result'];
                return content;
            }));*/
    }

    create(data): Observable<any> {
        return of(data);
    }

    update(data): Observable<any> {
        return of(data);
    }

    delete(id: number): Observable<string> {
        return;
      /*  const option = { body: { id }, headers: new HttpHeaders() };
        return this.http.delete(this.api + 'Group/Delete', option)
            .pipe(map(res => {
                const { content } = res['result'];
                return content;
            }));*/
    }

}