export class CopyEntity {
  constructor(
    public title: string,
    public circulation: string,
    public price: string,
    public present_circulation: string,
    public cost: string,
    public id: string = null,
  ) { }
}
