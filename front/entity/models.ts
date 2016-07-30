import StoneSkin = require('stone-skin');

class CopyStore extends StoneSkin.IndexedDb<ICopyStore> {
  get storeName() { return 'Copy'; }
}
class SoldStore extends StoneSkin.IndexedDb<ISoldStore> {
  get storeName() { return 'Sold'; }
}
class CircleStore extends StoneSkin.IndexedDb<ICircleStore> {
  get storeName() { return 'Circle'; }
}

const copy = Symbol();
const sold = Symbol();
const circle = Symbol();
const Instalces: any = {};

export function CopyStoreFactory(): CopyStore {
  if (!Instalces[copy]) { Instalces[copy] = new CopyStore(); }
  return Instalces[copy];
}
export function SoldStoreFactory(): SoldStore {
  if (!Instalces[sold]) { Instalces[sold] = new SoldStore(); }
  return Instalces[sold];
}
export function CircleStoreFactory(): CircleStore {
  if (!Instalces[circle]) { Instalces[circle] = new CircleStore(); }
  return Instalces[circle];
}
