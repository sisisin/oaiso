export class SellEntity {
  constructor(
    public copyId: string,
    public price: number,
    public numOfSold: number,
    public soldTime: Date,
  ) { }
}
