import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CopyEntity } from '../entity/copy.entity';

@Injectable()
export class CopyService {
  constructor(private http: Http) { }

  put(body: CopyEntity) {
    return this.http.put('/api/copy', body);
    }
}
