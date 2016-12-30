import { Component } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';
import { CopyStoreService } from '../../services/copy.store.service';
import { SellStoreService } from '../../services/sell.store.service';
import { SellService } from '../../services/sell.service';
import { SellEntity } from '../../entity/sell.entity';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {
  constructor(
    private copyStoreService: CopyStoreService,
    private sellStoreService: SellStoreService,
    private sellService: SellService,
  ) { }

  get sum() {
    if (!this.copyStoreService.copies) return 0;
    const prices = this.copyStoreService.copies.map(c => +c.price);
    return this.sellStoreService.selected.reduce((prev, curr, i) => prev + (curr * prices[i]), 0);
  }

  onSell() {
    const selected = this.sellStoreService.selected;
    const now = new Date;

    // FIXME: need refactoring data structure...
    const filteredCopies = this.copyStoreService.copies
      .filter((c, i) => selected[i] > 0);
    const filteredSelected = selected.filter((num, i) => num > 0);
    const body = filteredCopies
      .map((c, i) => new SellEntity(c.id, +c.price * filteredSelected[i], filteredSelected[i], now));
    this.sellService.bulkCreate(body)
      .toPromise()
      .then(res => {
        this.copyStoreService.copies = this.copyStoreService.copies.map((c, i) => {
          if (selected[i] === 0) return c;
          return new CopyEntity(c.title, (+c.circulation - selected[i]).toString(), c.price, c.present_circulation, c.cost, c.id);
        });
        this.sellStoreService.selected = this.copyStoreService.copies.map(c => 0);
        if(this.copyStoreService.copies.reduce((prev, curr) => prev + (+curr.circulation), 0) === 0) {
          Materialize.toast('Congratulations on selling out!', 5000);
        }
      });
  }

  isSelectedNothing() {
    return this.sellStoreService.isSelectedNothing();
  }
}
