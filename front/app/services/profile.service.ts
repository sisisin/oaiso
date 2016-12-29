import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProfileService {
  constructor(private http: Http) { }

  get() {
    return this.http.get('/api/profile');
  }
}

