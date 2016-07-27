interface ICopyStore {
  _id: string;
  title: string;
  firstCirculation: number;
  printingCost: number;
  distriPrice: number;
}

interface ISoldStore {
  sold: number;
  distriPrice: string;
}

interface ICopyData {
  _id: string;
  title: string;
  firstCirculation: string;
  printingCost: string;
  distriPrice: string;
}

interface IState {
  user: IUser;
  copyData: ICopyData;
}

interface IUser {
  photos: { value: string }[];
  displayName: string;
}
