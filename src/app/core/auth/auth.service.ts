import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { API_TOKEN_AUTH, API_TOKEN } from '../../utils/injectionToken';
import * as jwt_decode from "jwt-decode";
import { Auth } from 'src/app/components/auth/interfaces/auth.model';
import { of } from "rxjs/internal/observable/of";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<Auth>;
    public currentUser: Observable<Auth>;
    public baseURL = environment.baseUrl;
    constructor(
        private http: HttpClient,
        @Inject(API_TOKEN) private api_base: string,
        @Inject(API_TOKEN_AUTH) private api: string
    ) {
        // this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserSubject = new BehaviorSubject<Auth>({ bearerToken: localStorage.getItem('currentUser') });
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Auth {
        return this.currentUserSubject.value;
    }

    public authenticate(email: string, password: string, rememberMe: boolean): Observable<Auth> {
  
        localStorage.setItem('currentUser', 'bearerToken'); 
        localStorage.setItem('userName', 'User');
        localStorage.setItem('userSurname', 'Admin');

        this.currentUserSubject.next({bearerToken: 'bearerToken'});
        
        // return of(null);
        console.log("api", this.baseURL)
        return this.http.post(this.baseURL + '/acma/api/services/app/User/LoginApp', { email, password })
            .pipe(map(res => {

                const { content } = res['result'];

                this.saveUserToLocalStorage(content, rememberMe);

                this.currentUserSubject.next(content.bearerToken);

                return content;
        }));
    } 

    public logout(): void {
        // localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private saveUserToLocalStorage(content: any, isRememberUser: boolean): void {
        if (isRememberUser || true) {
            localStorage.setItem('currentUser', content.bearerToken);
        }
        localStorage.setItem('userName', content.name);
        localStorage.setItem('userSurname', content.surname);
    }

    getFeaturesForTenant(): Observable<any> {
        return this.http.get(this.api_base + 'FeatureTenant/GetFeaturesForTenant')
            .pipe(map(res => {
                const { content } = res['result'];
                return content;
            }));
    }
    
}
