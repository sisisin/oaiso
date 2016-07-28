type CopyId = string;
type UserId = string;

interface ICopyStore {
  _id: CopyId;
  title: string;
  firstCirculation: number;
  printingCost: number;
  distriPrice: number;
}

interface ISoldStore {
  _id?: string;
  userId: UserId;
  copyId: CopyId;
  sold: number;
  distriPrice: number;
  insertTime: Date;
}

interface IState {
  user: IUser;
  copyData: ICopyStore;
  solds: ISoldStore[];
}

interface IUser {
  id: UserId;
  photos: { value: string }[];
  displayName: string;
}
