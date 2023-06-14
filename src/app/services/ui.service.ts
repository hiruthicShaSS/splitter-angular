import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ISplit } from '../split';
import { SplitResult } from '../split-result';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private outputSubject = new BehaviorSubject<SplitResult>(
    new SplitResult(0, 0)
  );
  private canResetSubject = new Subject<boolean>();

  splitResultSubject$ = this.outputSubject.asObservable();
  canReset$ = this.canResetSubject.asObservable();

  updateOutput(split: ISplit): void {
    this.outputSubject.next(this.calculateSplitResult(split));
  }

  setCanReset(canReset: boolean) {
    this.canResetSubject.next(canReset);
  }

  calculateSplitResult(split: ISplit): SplitResult {
    const calculatedSplit = split.bill / split.numberOfPeople;
    const calculatedTip = (calculatedSplit * (split.tip / 100)) || 0;
    const calculatedTotal = (calculatedSplit + calculatedTip) || 0;

    return new SplitResult(calculatedTotal, calculatedTip);
  }
}
