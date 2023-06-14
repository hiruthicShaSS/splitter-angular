import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.isCustomTip = this.tipAmount == 'Custom';

    this.uiService.canReset$.subscribe((canReset) => (this.isActive = false));
  }

  updateTip() {
    console.log(this.isActive);
    this.onTipUpdate.emit(parseInt(this.tipAmount.toString()));
  }

  public get tipAmountOutput(): string {
    return `${this.tipAmount}${this.isCustomTip ? '' : '%'}`;
  }
}
