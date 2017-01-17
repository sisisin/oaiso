import { Component } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';
import { CopyStoreService } from '../../services/copy.store.service';
import { SellStoreService } from '../../services/sell.store.service';
import { SellService } from '../../services/sell.service';
import { SellEntity, ISellEntity } from '../../entity/sell.entity';

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

  get sum(): number {
    return this.sellStoreService.sum;
  }

  onSell() {
    const body: ISellEntity[] = this.sellStoreService.buildSellEntities();
    this.sellService.bulkCreate(body)
      .toPromise()
      .then(res => {
        this.copyStoreService.copies = this.copyStoreService.copies.map((c, i) => {
          const selected = this.sellStoreService.sellLines[i].selected

          if (selected === 0) return c;
          return new CopyEntity(c.title, (+c.circulation - selected).toString(), c.price, c.present_circulation, c.cost, c.id);
        });
        this.sellStoreService.sellLines = this.sellStoreService.sellLines.map(l => {
          l.selected = 0;
          return l;
        });
        if (this.copyStoreService.copies.reduce((prev, curr) => prev + (+curr.circulation), 0) === 0) {
          Materialize.toast('Congratulations on selling out!', 5000);
        }
      });
  }

  isSelectedNothing() {
    return this.sellStoreService.isSelectedNothing();
  }
}
