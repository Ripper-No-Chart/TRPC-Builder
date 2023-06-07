import { Injectable } from '@angular/core';
import { Navigation } from '../interfaces/navigation';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigation: Navigation = {
    budget_id: '',
    budget_name: '',
  };
  private _stream = new BehaviorSubject(this.navigation);

  constructor() {}

  getData(): Observable<Navigation> {
    return this._stream.asObservable();
  }

  setData({ budget_id, budget_name, statistics }: Navigation): void {
    return this._stream.next({
      budget_id,
      budget_name,
      statistics,
    });
  }
}
