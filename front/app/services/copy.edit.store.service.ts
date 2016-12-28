import { Injectable } from '@angular/core';

@Injectable()
export class CopyEditStoreService {
  editModeIndex: number = null;
  get isEditMode(): boolean { 
    return this.editModeIndex !== null;
  }
}
