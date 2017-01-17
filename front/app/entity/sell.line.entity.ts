import { CopyEntity } from './copy.entity';

export interface ISellLine {
  selected: number;
  copy: CopyEntity;
}

export class SellLine {
  constructor(
    public selected: number,
    public copy: CopyEntity,
  ) { }
}
