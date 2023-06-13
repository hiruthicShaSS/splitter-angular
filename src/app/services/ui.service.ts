import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Split } from '../split';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private splitSubject = new BehaviorSubject<Split>({
    bill: 0,
    tip: 0,
    numberOfPeople: 1,
  });
  private canResetSubject = new Subject<boolean>();

  splitSubject$ = this.splitSubject.asObservable();
  canReset$ = this.canResetSubject.asObservable();

  updateOutput(split: Split): void {
    this.splitSubject.next(split);
  }

  setCanReset(canReset: boolean) {
    this.canResetSubject.next(canReset);
  }
}
