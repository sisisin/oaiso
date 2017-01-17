import { Component, OnInit } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEntity } from '../../entity/copy.entity';
import { SellStoreService } from '../../services/sell.store.service';
import { SellService } from '../../services/sell.service';

@Component({
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  public totalSold = 0;
  constructor(
    public copyStoreService: CopyStoreService,
    public sellStoreService: SellStoreService,
    public sellService: SellService,
  ) { }

  ngOnInit() {
    this.sellStoreService.init();
    this.sellService.getSummary().toPromise()
      .then(res => {
        this.totalSold = +res.json()[0].total_sold;
      });
  }

  get deficit() {
    return this.copyStoreService.calcSumCost() - this.totalSold;
  }

  onAdd(id: string) {
    this.sellStoreService.add(id);
  }
  onMinus(id: string) {
    this.sellStoreService.minus(id);
  }

  isSelectedJustAsCirculation(id: string) {
    return this.sellStoreService.isSelectedJustAsCirculation(id);
  }

  isSelectedNone(id: string) {
    return this.sellStoreService.isSelectedNone(id);
  }
}
