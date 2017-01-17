import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ISellEntity } from '../entity/sell.entity';

@Injectable()
export class SellService {
  constructor(private http: Http) { }

  bulkCreate(body: ISellEntity[]) {
    return this.http.post('/api/sell', body);
  }

  getSummary() {
    return this.http.get('/api/sell');
  }
}
