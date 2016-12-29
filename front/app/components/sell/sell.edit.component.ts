import { Component, OnInit } from '@angular/core';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEditStoreService } from '../../services/copy.edit.store.service';

@Component({
  templateUrl: './sell.edit.component.html',
})
export class SellEditComponent implements OnInit {
  constructor(
    public copyStoreService: CopyStoreService,
    public copyEditStoreService: CopyEditStoreService,
  ) { }

  ngOnInit() {
    this.copyStoreService.init();
  }

  onCancel() {
    this.copyEditStoreService.editModeIndex = null;
  }
  onAddCopy() {
    this.copyEditStoreService.editModeIndex = this.copyStoreService.copies.length;
  }
}
