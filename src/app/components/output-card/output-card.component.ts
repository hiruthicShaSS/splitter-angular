import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-output-card',
  templateUrl: './output-card.component.html',
  styleUrls: ['./output-card.component.css'],
})
export class OutputCardComponent implements OnInit {
  @Input() isDirty: boolean = false;
  isAnimating: boolean = false;

  splitSubscription!: Subscription;
  tipAmountPerPerson: number = 0.0;
  totalAmountPerPerson: number = 0.0;

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.uiService.splitSubject$.subscribe((split) => {
      this.isAnimating = true;

      const calculatedSplit = split.bill / split.numberOfPeople;
      const calculatedTip = calculatedSplit * (split.tip / 100);
      const calculatedTotal = calculatedSplit + calculatedTip;

      this.tipAmountPerPerson = calculatedTip;
      this.totalAmountPerPerson = calculatedTotal;

      setTimeout(() => (this.isAnimating = false), 400);
    });

    this.uiService.canReset$.subscribe((canReset) => (this.isDirty = canReset));
  }

  public get getTipAmountPerPerson(): string {
    return this.tipAmountPerPerson.toFixed(2);
  }

  public get getTotalAmountPerPerson(): string {
    return this.totalAmountPerPerson.toFixed(2);
  }

  reset() {
    this.tipAmountPerPerson = 0;
    this.totalAmountPerPerson = 0;
    this.isDirty = false;
    this.isAnimating = false;

    this.uiService.setCanReset(false);
  }
}
