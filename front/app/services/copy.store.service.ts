import { Injectable } from '@angular/core';

@Injectable()
export class CopyStoreService {
  public copies = [
    { title: 'ほげ', circulation: 19, price: 500 },
    { title: 'fuga', circulation: 1, price: 100 },
  ];
}
