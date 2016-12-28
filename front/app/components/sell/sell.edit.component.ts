import { Component } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEditStoreService } from '../../services/copy.edit.store.service';

@Component({
  templateUrl: './sell.edit.component.html',
})
export class SellEditComponent {
  constructor(
    public copyStoreService: CopyStoreService,
    public copyEditStoreService: CopyEditStoreService,
  ) { }

  onCancel() {
    this.copyEditStoreService.editModeIndex = null;
  }
}
