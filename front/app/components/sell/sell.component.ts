import { Component, OnInit } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEntity } from '../../entity/copy.entity';

@Component({
  templateUrl: './sell.component.html',
})
export class SellComponent implements OnInit {
  constructor(public copyStoreService: CopyStoreService) { }

  ngOnInit() {
    this.copyStoreService.init();
  }
}
