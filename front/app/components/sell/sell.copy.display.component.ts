import { Component, Input } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';
import { CopyEditStoreService } from '../../services/copy.edit.store.service';

@Component({
  selector: '[appSellDisplay]',
  templateUrl: './sell.copy.display.component.html',
})
export class SellCopyDisplayComponent {
  @Input() copy: CopyEntity;
  @Input() index: number;

  constructor(public copyEditStoreService: CopyEditStoreService) { }
  onEditClick() {
    this.copyEditStoreService.editModeIndex = this.index;
  }
}
