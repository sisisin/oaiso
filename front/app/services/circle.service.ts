import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CircleEntity } from '../entity/circle.entity';

@Injectable()
export class CircleService {
  constructor(private http: Http) { }

  get() {
    return this.http.get('/api/circle');
  }

  update(body: CircleEntity) {
    return this.http.put(`/api/circle/${body.id}`, body);
  }

  create(name: string) {
    return this.http.post('/api/circle', { name });
  }
}
