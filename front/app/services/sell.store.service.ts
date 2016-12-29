import { Injectable } from '@angular/core';
import { CopyEntity } from '../entity/copy.entity';
import { CopyService } from './copy.service';
import { CopyStoreService } from './copy.store.service';

@Injectable()
export class SellStoreService {
  public selected: number[];

  constructor(private copyStoreService: CopyStoreService) { }

  add(id: string) {
    this.selected[+id]++;
  }
  minus(id: string) {
    this.selected[+id]--;
  }

  isSelectedJustAsCirculation(id: string) {
    return this.selected[+id] >= +this.copyStoreService.copies[+id].circulation;
  }

  isSelectedNone(id: string) {
    return this.selected[+id] <= 0;
  }

  isSelectedNothing() {
    if(!this.selected) return true;
    return this.selected.filter(num => num !== 0).length === 0;
  }
}
