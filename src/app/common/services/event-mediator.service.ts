import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventMediatorService {

  // loading changed event
  private loadingChangedSubject$ = new BehaviorSubject<boolean>(false);
  public loadingChanged = this.loadingChangedSubject$.asObservable();

  public notifyOnLoadingChanged(loadingData: boolean): void {
      this.loadingChangedSubject$.next(loadingData);
  } 

  // notifications changed event
  private notificationsChangedSubject$ = new BehaviorSubject<string>('');
  public notificationsChanged = this.notificationsChangedSubject$.asObservable();

  public notifyOnNotificationsChanged(message: string): void {
      this.notificationsChangedSubject$.next(message);
  }

}
