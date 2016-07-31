type CopyId = string;
type UserId = string;
type CircleId = string;

interface ICircleStore {
  _id: string;
  name: string;
  twitter_id: string;
}
interface ICircleResponse {
  id: string;
  name: string;
  twitter_id: string;
}
interface ICircleRegisterd {
  isRegisterd: boolean;
}
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
  circle: {
    store: ICircleStore;
    isRegisterd: boolean;
  };
}

interface IUser {
  id: UserId;
  photos: { value: string }[];
  displayName: string;
}
