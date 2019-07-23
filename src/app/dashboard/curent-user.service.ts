import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurentUserService {

  // ONLY TARGET: PUBLISHER FOR OTHERS SUBSCRIBLE INSTEAD OF SAVE LOCAL STORAGE

  public $currentUserObservable: BehaviorSubject<any>;
  public $isAdminObservable: BehaviorSubject<boolean>;

  constructor() {
    this.$currentUserObservable = new BehaviorSubject(null);
    this.$isAdminObservable = new BehaviorSubject(false);
  }

  getCurrentUser() {
    return this.$currentUserObservable;
  }

  publishCurrentUser(user) {
    this.$currentUserObservable.next(user);
  }

  getIsAdmin() {
    return this.$isAdminObservable;
  }

  publishIsAdmin(role) {
    const isAdmin = (role === 'admin') ? true : false;
    this.$isAdminObservable.next(isAdmin);
  }
}
