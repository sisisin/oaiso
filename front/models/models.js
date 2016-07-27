const StoneSkin = require('stone-skin/with-tv4');

class CopyStore extends StoneSkin.IndexedDb {
  get storeName() { return 'Copy'; }
  constructor() {
    super();
    const typeNumber = { type: 'number' };
    const typeString = { type: 'string' };
    this.schema = {
      _id: typeString
      , title: typeString
      , firstCirculation: typeNumber
      , printingCost: typeNumber
      , distriPrice: typeNumber
    };
  }
}
class SoldStore extends StoneSkin.IndexedDb {
  get storeName() { return 'Sold'; }
  constructor() {
    super();
    const typeNumber = { type: 'number' };
    this.schema = {
      sold: typeNumber
      , distriPrice: typeNumber
    };
  }
}

module.exports = { CopyStore, SoldStore };
