export interface ICopyEntity {
  title: string;
  circulation: string;
  price: string;
  present_circulation: string;
  cost: string;
  id: string;
}

export class CopyEntity implements ICopyEntity {
  constructor(
    public title: string,
    public circulation: string,
    public price: string,
    public present_circulation: string,
    public cost: string,
    public id: string = null,
  ) { }
}
