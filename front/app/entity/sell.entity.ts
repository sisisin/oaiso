export interface ISellEntity {
  copyId: string;
  price: number;
  numOfSold: number;
  soldTime: Date;
}

export class SellEntity implements ISellEntity {
  constructor(
    public copyId: string,
    public price: number,
    public numOfSold: number,
    public soldTime: Date,
  ) { }
}
