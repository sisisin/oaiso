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
  @Input() givenCopy: CopyEntity;
  @Input() index: number;
  copy: CopyEntity;

  constructor(
    private copyStoreService: CopyStoreService,
    private copyEditStoreService: CopyEditStoreService,
    private copyService: CopyService,
  ) { }

  ngOnInit() {
    if (this.givenCopy == null) {
      this.copy = new CopyEntity('', '0', '0');
    } else {
      const {title, circulation, price, id} = this.givenCopy;
      this.copy = new CopyEntity(title, circulation, price, id);
    }
  }

  onSave() {
    if (this.copy.id === null) {
      this.create();
    } else {
      this.update();
    }
  }

  onDelete() {
    return this.copyService
      .delete(this.copy)
      .subscribe(res => {
        this.copyStoreService.copies = this.copyStoreService.copies.filter(ce => ce.id !== this.copy.id);
        Materialize.toast('deleted', 5000);
      }, err => {
        console.log(err);
        // todo toasting this err
      }).add(() => {
        this.copyEditStoreService.editModeIndex = null;
      });
  }

  private create() {
    return this.copyService
      .create(this.copy)
      .subscribe(res => {
        const {title, circulation, price}: { title: string; circulation: string; price: string; } = res.json();
        this.copyStoreService.copies.push(new CopyEntity(title, circulation, price));
        this.copyEditStoreService.editModeIndex = null;
        // todo: request update
        console.log('done~');
      });
  }

  private update() {
    return this.copyService
      .update(this.copy)
      .subscribe(res => {
        const {id, title, circulation, price}: { id: string; title: string; circulation: string; price: string; } = res.json();
        this.copyStoreService.copies = this.copyStoreService.copies.map(copy => {
          return copy.id === id ? new CopyEntity(title, circulation, price, id) : copy;
        });
        this.copyEditStoreService.editModeIndex = null;
      });
  }
}
