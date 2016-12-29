import { Component, OnInit } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEntity } from '../../entity/copy.entity';
import { SellStoreService } from '../../services/sell.store.service';

@Component({
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  constructor(
    public copyStoreService: CopyStoreService,
    public sellStoreService: SellStoreService,
  ) { }

  ngOnInit() {
    this.copyStoreService.init()
      .then(() => {
        this.sellStoreService.selected = this.copyStoreService.copies.map(c => 0);
      });
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
