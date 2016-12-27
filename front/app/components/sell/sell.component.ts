import { Component } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';

@Component({
  templateUrl: './sell.component.html',
})
export class SellComponent {
  constructor(public copyStoreService: CopyStoreService) { }
}
