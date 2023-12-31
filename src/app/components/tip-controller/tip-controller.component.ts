import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { ISplit } from 'src/app/split';

@Component({
  selector: 'app-tip-controller',
  templateUrl: './tip-controller.component.html',
  styleUrls: ['./tip-controller.component.css'],
})
export class TipControllerComponent implements OnInit {
  @Input() isCustomTip: boolean = false;
  isCustomTipSelected: boolean = false;
  split: ISplit = {
    bill: 0,
    tip: 0,
    numberOfPeople: 1,
  };
  tipRange: number[] = [5, 10, 15, 25, 50];

  resetSubscription!: Subscription;

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.resetSubscription = this.uiService.canReset$
      .subscribe((canReset) => (!canReset ? this.reset() : null));
  }

  onChange(): void {
    if (this.split.numberOfPeople === null || this.split.numberOfPeople === 0)
      this.split.numberOfPeople = 1;

    this.uiService.updateOutput(this.split);
    this.uiService.setCanReset(true);
  }

  handleTipClick(tip: number) {
    this.split.tip = tip;
  }

  setTip(tip: number) {
    if (this.split.tip === tip) {
      this.split.tip = 0;
      this.onChange();

      return;
    }

    this.isCustomTipSelected = false;
    this.split.tip = tip;
    this.onChange();
  }

  reset(): void {
    this.split.bill = 0;
    this.split.tip = 0;
    this.split.numberOfPeople = 1;
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }
}
