import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable()
export class DataService {
  saveDataToStorage(data: string): void {
    localStorage.setItem('data', data);
  }

  getDataFromStorage() {
    let data = localStorage.getItem('data');
    data = data ? JSON.parse(data) : null;
    return of(data);
  }
}
