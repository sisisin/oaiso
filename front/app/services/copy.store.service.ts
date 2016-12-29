import { Injectable } from '@angular/core';
import { CopyEntity } from '../entity/copy.entity';
import { CopyService } from './copy.service';

@Injectable()
export class CopyStoreService {
  public copies: CopyEntity[];

  constructor(private copyService: CopyService) { }

  init() {
    this.copyService
      .list()
      .subscribe(res => {
        const list = <CopyEntity[]>res.json();
        this.copies = list.map(e => new CopyEntity(e.title, e.circulation, e.price, e.id));
      });
  }
}
