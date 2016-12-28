import { Component, Input, OnInit } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';
import { CopyStoreService } from '../../services/copy.store.service';
import { CopyEditStoreService } from '../../services/copy.edit.store.service';
import { CopyService } from '../../services/copy.service';

@Component({
  selector: '[appSellNew]',
  templateUrl: './sell.new.component.html',
})
export class SellNewComponent implements OnInit {
  @Input() copy: CopyEntity;
  @Input() index: number;

  constructor(
    private copyStoreService: CopyStoreService,
    private copyEditStoreService: CopyEditStoreService,
    private copyService: CopyService,
  ) { }
  ngOnInit() {
    if (this.copy == null) {
      this.copy = new CopyEntity('', '0', '0');
    }
  }
  onSave() {
    this.copyService
      .put(this.copy)
      .subscribe(res => {
        const {title, circulation, price}: { title: string, circulation: string, price: string } = res.json();
        this.copyStoreService.copies.push(new CopyEntity(title, circulation,price));
        this.copyEditStoreService.editModeIndex = null;
        // todo: request update
        console.log('done~');
      });
  }
}
