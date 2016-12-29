export interface ICircleEntity {
  id: string;
  twitter_id: string;
  name: string;
}

export class CircleEntity implements ICircleEntity {
  constructor(
    public id: string,
    public twitter_id: string,
    public name: string,
  ) { }
}
