import { Injectable } from '@angular/core';
import { CopyEntity } from '../entity/copy.entity';
@Injectable()
export class CopyStoreService {
  public copies = [
    new CopyEntity('ほげ', '19', '500', '0'),
    new CopyEntity('fuga', '1', '100', '1'),
  ];
}
