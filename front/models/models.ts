import StoneSkin = require('stone-skin');

export class CopyStore extends StoneSkin.IndexedDb<ICopyStore> {
  get storeName() { return 'Copy'; }
}
export class SoldStore extends StoneSkin.IndexedDb<ISoldStore> {
  get storeName() { return 'Sold'; }
}
