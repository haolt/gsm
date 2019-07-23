import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getLocalStorage(key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  }

  setLocalStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  eraseLocalStorage(key) {
    localStorage.removeItem(key);
  }

  clearAllLocalStorage() {
    localStorage.clear();
  }
}
