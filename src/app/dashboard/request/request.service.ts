import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/core/cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public API_URL: string = environment.apiUrl;
  public errStatus: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  private token = this.cookieService.getCookie('token');

  getAllUsers() {
    return this.http.get(
      this.buildUrl('requests'),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  // IF NOT USE INTERCEPTOR NOT YET WORKS
  // getAllUsers() {
  //   return this.http.get(this.buildUrl('users'));
  // }
  // updateAUser({ id, name, email, password, avatar, position, division, role }) {
  //   return this.http.put(
  //     this.buildUrl('users/' + id),
  //     {
  //       name,
  //       email,
  //       password,
  //       avatar,
  //       position,
  //       division,
  //       role
  //     },
  //     {
  //       headers: this.buildHeader(this.token)
  //     }
  //   );
  // }

  // addAUser({ name, email, password, avatar, position, division, role }) {
  //   return this.http.post(
  //     this.buildUrl('users'),
  //     {
  //       name,
  //       email,
  //       password,
  //       avatar,
  //       position,
  //       division,
  //       role
  //     },
  //     {
  //       headers: this.buildHeader(this.token)
  //     }
  //   );
  // }

  // deleteAUser(id) {
  //   return this.http.delete(
  //     this.buildUrl('users/' + id ),
  //     {
  //       headers: this.buildHeader(this.token)
  //     }
  //   );
  // }

  // getAUser(id) {
  //   return this.http.get(
  //     this.buildUrl('users/' + id ),
  //     {
  //       headers: this.buildHeader(this.token)
  //     }
  //   );
  // }

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
