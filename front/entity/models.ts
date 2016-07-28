import StoneSkin = require('stone-skin');

class CopyStore extends StoneSkin.IndexedDb<ICopyStore> {
  get storeName() { return 'Copy'; }
}

class SoldStore extends StoneSkin.IndexedDb<ISoldStore> {
  get storeName() { return 'Sold'; }
}

const copy = Symbol();
const sold = Symbol();
const Instalces: any = {};

export function CopyStoreFactory(): CopyStore {
  if (!Instalces[copy]) { Instalces[copy] = new CopyStore() }
  return Instalces[copy];
}
export function SoldStoreFactory(): SoldStore {
  if (!Instalces[sold]) { Instalces[sold] = new SoldStore() }
  return Instalces[sold];
}
