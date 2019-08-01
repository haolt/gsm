import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { CookieService } from 'src/app/core/cookie.service';
import { environment } from 'src/environments/environment';
import {mergeMap} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public API_URL: string = environment.apiUrl;
  public errStatus: string;
  private token = this.cookieService.getCookie('token');
  // public cardSbj: BehaviorSubject<any[] | null >; // Example of Mr.Dan

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    // this.cardSbj = new BehaviorSubject(null);
  }

  // addCard() {
  //   this.cardSbj.next(['Observable is so difficult :(( . This is example getCart addCart Mr.Dan guided me. 22/03. Hic :']);
  // }

  // getCart() {
  //   return this.cardSbj;
  // }

  getAllRequests() {
    return this.http.get(
      this.buildUrl('requests'),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  updateARequestForAdmin(
    id: string,
    status: string
  ) {
    return this.http.put(
      this.buildUrl('requests/' + id),
      {
        status
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  updateARequestForNomalUser({
    id,
    type,
    checkTime,
    compensationFromTime,
    compensationToTime,
    reason
  }) {
    return this.http.put(
      this.buildUrl('requests/' + id),
      {
        type,
        checkTime,
        compensationFromTime,
        compensationToTime,
        reason
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  updateARequest(request) {
    return this.http.put(
      this.buildUrl('requests/' + request._id),
      request,
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  addARequest({
      checkTime,
      compensationFromTime,
      compensationToTime,
      createdAt,
      createdBy,
      reason,
      status,
      type
  }) {
    return this.http.post(
      this.buildUrl('requests'),
      {
        checkTime,
        compensationFromTime,
        compensationToTime,
        createdAt,
        createdBy,
        reason,
        status,
        type
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  deleteARequest(id) {
    return this.http.delete(
      this.buildUrl('requests/' + id ),
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
