import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'src/app/core/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API_URL: string = environment.apiUrl;
  public errStatus: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  private token = this.cookieService.getCookie('token');

  getAllUsers() {
    return this.http.get(
      this.buildUrl('users'),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  // IF NOT USE INTERCEPTOR NOT YET WORKS
  // getAllUsers() {
  //   return this.http.get(this.buildUrl('users'));
  // }
  updateAUser({ id, name, email, password, avatar, position, division, role }) {
    return this.http.put(
      this.buildUrl('users/' + id),
      {
        name,
        email,
        password,
        avatar,
        position,
        division,
        role
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  addAUser({ name, email, password, avatar, position, division, role }) {
    return this.http.post(
      this.buildUrl('users'),
      {
        name,
        email,
        password,
        avatar,
        position,
        division,
        role
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  handleError(err) {
    if (err.error instanceof Error) {
        console.log(`Client side Error: ${ err.error.message }`);
    } else {
        this.errStatus = err.status;
        console.log(this.errStatus);
    }
  }
  // build header for request
  private buildHeader(token: string): HttpHeaders {
      const header = new HttpHeaders({
          'x-access-token': token
      });
      return header;
  }

  private buildParams(paramsData): HttpParams {
      const params = new HttpParams({ fromObject: paramsData });
      return params;
  }
  // build url for request
  private buildUrl(endpoint: string): string {
      return this.API_URL + endpoint;
  }

}
