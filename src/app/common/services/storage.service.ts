import { Injectable } from '@angular/core';
import { StorageConstants } from '../constants/storage-constants';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveData(key: string, data: any, type: string = StorageConstants.STORAGE_TYPE): void {
    if (type === StorageConstants.STORAGE_TYPE)
      sessionStorage.setItem(`${StorageConstants.STORAGE_PREFIX}-${key}`, JSON.stringify(data));
    else
      localStorage.setItem(`${StorageConstants.STORAGE_PREFIX}-${key}`, JSON.stringify(data));
  }

  retrieveData(key: string, type: string = StorageConstants.STORAGE_TYPE): string | null {
    if (type === StorageConstants.STORAGE_TYPE)
      return sessionStorage.getItem(`${StorageConstants.STORAGE_PREFIX}-${key}`);    
    else 
      return sessionStorage.getItem(`${StorageConstants.STORAGE_PREFIX}-${key}`);    
  }

  removeData(key: string, type: string = StorageConstants.STORAGE_TYPE): void {
    if (type === StorageConstants.STORAGE_TYPE)
      sessionStorage.removeItem(`${StorageConstants.STORAGE_PREFIX}-${key}`);
    else 
      sessionStorage.removeItem(`${StorageConstants.STORAGE_PREFIX}-${key}`);
  }
}
