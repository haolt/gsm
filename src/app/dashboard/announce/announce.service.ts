import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/core/cookie.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {

  public API_URL: string = environment.apiUrl;
  public errStatus: string;
  private token = this.cookieService.getCookie('token');

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllAnnounces() {
    return this.http.get(
      this.buildUrl('announces'),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  createAnAnnounce(announce) {
    return this.http.post(
      this.buildUrl('announces'),
      announce,
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  deleteAnAnnounce(id) {
    return this.http.delete(
      this.buildUrl('announces/' + id ),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  updateAnAnnounce(announce) {
    return this.http.put(
      this.buildUrl('announces/' + announce._id),
      announce,
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
  // build url for request
  private buildUrl(endpoint: string): string {
      return this.API_URL + endpoint;
  }
}
