import { Component } from '@angular/core';
import { CopyStoreService } from '../services/copy.store.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  // styleUrls: ['./app.component.css']
})
export class SellComponent {
  constructor(public copyStoreService: CopyStoreService) { }
}
