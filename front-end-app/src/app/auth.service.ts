import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private regApiUrl = 'http://localhost:3000/account/reg';
  private authApiUrl = 'http://localhost:3000/account/auth';
  token: any;
  user: any;
  public isUserLogged =  new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.regApiUrl, user, { headers });
  }

  authUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.authApiUrl, user, { headers });
  }

  storeUser(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
    this.isUserLogged.next(true);
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
    this.isUserLogged.next(false);
  }
  isLoggedIn(): boolean {
    return this.isUserLogged.getValue();
  }
}
