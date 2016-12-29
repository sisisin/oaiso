export interface IProfile {
  id: string;
  photos: { value: string }[]
  displayName: string;
}

export class Profile implements IProfile {
  constructor(
    public id: string,
    public photos: { value: string }[],
    public displayName: string,
  ) { }
}
