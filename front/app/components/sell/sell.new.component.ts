import { Component, Input, OnInit } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';
import { CopyEditStoreService } from '../../services/copy.edit.store.service';

@Component({
  selector: '[appSellNew]',
  templateUrl: './sell.new.component.html',
})
export class SellNewComponent implements OnInit {
  @Input() copy: CopyEntity;
  @Input() index: number;

  constructor(private copyEditStoreService: CopyEditStoreService) { }
  ngOnInit() {
    if (this.copy == null) {
      this.copy = new CopyEntity('', '0', '0');
    }
  }
  onSave() {
    this.copyEditStoreService.editModeIndex = null;
    // todo: request update
    console.log(this.copy);
  }
}
