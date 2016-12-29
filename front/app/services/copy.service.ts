import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CopyEntity } from '../entity/copy.entity';

@Injectable()
export class CopyService {
  constructor(private http: Http) { }

  list() {
    return this.http.get('/api/copy');
  }

  get(body: CopyEntity) {
    return this.http.get(`/api/copy/${body.id}`);
  }

  create(body: CopyEntity) {
    return this.http.post('/api/copy', body);
  }

  update(body: CopyEntity) {
    return this.http.put(`/api/copy/${body.id}`, body);
  }

  delete(body: CopyEntity) {
    return this.http.delete(`/api/copy/${body.id}`);
  }
}
