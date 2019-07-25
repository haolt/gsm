import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'src/app/core/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  public API_URL: string = environment.apiUrl;
  public errStatus: string;
  private token = this.cookieService.getCookie('token');

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllDivisions() {
    return this.http.get(
      this.buildUrl('divisions'),
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
