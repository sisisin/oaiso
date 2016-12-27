import { Component } from '@angular/core';

@Component({
  selector: '[appSellNew]',
  templateUrl: './sell.new.component.html',
})
export class SellNewComponent {
  title = '';
  circulation = '0';
  price = '0';

  onClick() {
    // todo: put request
    console.log(this.title);
  }
}
