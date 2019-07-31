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
  // public $addedRequestObservable: BehaviorSubject<any>;
  // public cardSbj: BehaviorSubject<any[] | null >; // Example of Mr.Dan

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    // this.$addedRequestObservable = new BehaviorSubject(null);
    // this.cardSbj = new BehaviorSubject(null);
  }

  // addCard() {
  //   this.cardSbj.next(['Observable is so difficult :(( . This is example getCart addCart Mr.Dan guided me. 22/03. Hic :']);
  // }

  // getCart() {
  //   return this.cardSbj;
  // }

  // getAddedRequest() {
  //   return this.$addedRequestObservable;
  // }
  // publishAddedRequest(request) {
  //   this.$addedRequestObservable.next(request);
  // }

  getAllRequests() {
    return this.http.get(
      this.buildUrl('requests'),
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  updateARequest(
    id: string,
    // checkTime,
    // compensationFromTime,
    // compensationToTime,
    // createdAt,
    // createdBy,
    // reason,
    status: string
    //, type
  ) {
    return this.http.put(
      this.buildUrl('requests/' + id),
      {
        // checkTime,
        // compensationFromTime,
        // compensationToTime,
        // createdAt,
        // createdBy,
        // reason,
        status,
        // type
      },
      {
        headers: this.buildHeader(this.token)
      }
    );
  }

  _updateARequest_version_full(request) {
    if (request.checkTime) {
      request.checkTime = request.checkTime;
    }
    if (request.compensationFromTime) {
      request.compensationFromTime = request.compensationFromTime;
    }
    if (request.compensationToTime) {
      request.compensationToTime = request.compensationToTime;
    }
    if (request.reason) {
      request.reason = request.reason;
    }
    if (request.status) {
      request.status = request.status;
    }
    if (request.type) {
      request.type = request.type;
    }
    return this.http.put(
      this.buildUrl('requests/' + request.id),
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
