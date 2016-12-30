import { Injectable } from '@angular/core';
import { CopyEntity } from '../entity/copy.entity';
import { CopyService } from './copy.service';

@Injectable()
export class CopyStoreService {
  public copies: CopyEntity[];

  constructor(private copyService: CopyService) { }

  init() {
    return this.copyService
      .list()
      .toPromise()
      .then(res => {
        const list = <CopyEntity[]>res.json();
        this.copies = list.map(e => new CopyEntity(e.title, e.circulation, e.price, e.present_circulation, e.cost, e.id));
      });
  }

  calcSumCost() {
    if(!this.copies) return 0;
    return this.copies.reduce((prev, curr) => prev + +curr.cost, 0);
  }
}
