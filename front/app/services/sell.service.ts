import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SellEntity } from '../entity/sell.entity';

@Injectable()
export class SellService {
  constructor(private http: Http) { }

  bulkCreate(body: SellEntity[]) {
    return this.http.post('/api/sell', body);
  }

  getSummary() {
    return this.http.get('/api/sell');
  }
}
