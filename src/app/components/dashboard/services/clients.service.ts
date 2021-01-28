import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    public baseURL = environment.baseUrl;

    constructor(private http: HttpClient, private auth: AuthService) {}

    getAllClients() {
        return this.http.get(
            this.baseURL + '/acma/api/services/app/Tenant/GetAll'
            ).pipe(map(res => {
            const { content } = res['result'];
            return content;
        }));
    }

    createClient(tenantData) {
        return this.http.post(this.baseURL + '/acma/api/services/app/Tenant/Create', tenantData)
            .pipe(map(res => {
                console.log('res--------->', res['result'])
        }));
    }
}