import { Injectable } from '@angular/core';
import { CopyEntity } from '../entity/copy.entity';
import { SellEntity } from '../entity/sell.entity';
import { SellLine } from '../entity/sell.line.entity';
import { CopyService } from './copy.service';
import { CopyStoreService } from './copy.store.service';

@Injectable()
export class SellStoreService {
  public sellLines: SellLine[];

  constructor(private copyStoreService: CopyStoreService) { }

  init(): void {
    this.copyStoreService.init()
      .then(() => {
        this.sellLines = this.copyStoreService.copies.map(c => new SellLine(0, c));
      });
  }

  get sum(): number {
    if (!this.sellLines) return 0;
    const prices = this.copyStoreService.copies.map(c => +c.price);
    return this.sellLines.reduce((prev, curr, i) => prev + (+curr.copy.price * curr.selected), 0);
  }

  buildSellEntities(): SellEntity[] {
    const now = new Date;
    return this.sellLines
      .filter(l => l.selected > 0)
      .map((l, i) => new SellEntity(l.copy.id, +l.copy.price * l.selected, l.selected, now));
  }

  add(id: string): void {
    if (!this.sellLines) return;
    this.sellLines[+id].selected++;
  }
  minus(id: string): void {
    if (!this.sellLines) return;
    this.sellLines[+id].selected--;
  }

  isSelectedJustAsCirculation(id: string): boolean {
    if (!this.sellLines) return true;
    return this.sellLines[+id].selected >= +this.copyStoreService.copies[+id].circulation;
  }

  isSelectedNone(id: string): boolean {
    if (!this.sellLines) return true;
    return this.sellLines[+id].selected <= 0;
  }

  isSelectedNothing(): boolean {
    if (!this.sellLines) return true;
    return this.sellLines.filter(l => l.selected !== 0).length === 0;
  }
}
