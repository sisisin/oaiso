import { Component } from '@angular/core';
import { CopyEntity } from '../../entity/copy.entity';

@Component({
  selector: '[appSellNew]',
  templateUrl: './sell.new.component.html',
})
export class SellNewComponent {
  copy = new CopyEntity('', '0', '0');

  onClick() {
    // todo: put request
    console.log(this.copy);
  }
}
