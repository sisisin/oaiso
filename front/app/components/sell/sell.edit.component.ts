import { Component } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';

@Component({
  templateUrl: './sell.edit.component.html',
})
export class SellEditComponent {
  constructor(public copyStoreService: CopyStoreService) { }
}
