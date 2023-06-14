import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css'],
})
export class TipComponent implements OnInit {
  @Input() tipAmount: number | string = 'Custom';
  @Output() onTipUpdate: EventEmitter<number> = new EventEmitter();
  isCustomTip: boolean = false;
  isActive: boolean = false;

  resetSubscription!: Subscription;

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.isCustomTip = this.tipAmount == 'Custom';

    this.resetSubscription = this.uiService.canReset$.subscribe((_) => (this.isActive = false));
  }

  updateTip() {
    this.onTipUpdate.emit(parseInt(this.tipAmount.toString()));
  }

  public get tipAmountOutput(): string {
    return `${this.tipAmount}${this.isCustomTip ? '' : '%'}`;
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }
}
