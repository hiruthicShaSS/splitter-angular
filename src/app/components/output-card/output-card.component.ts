import { Component, Input, OnInit } from '@angular/core';
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
  tipAmountPerPerson!: string;
  totalAmountPerPerson!: string;

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.uiService.splitResultSubject$.subscribe((result) => {
      this.isAnimating = true;

      this.totalAmountPerPerson = result.getAmount();
      this.tipAmountPerPerson = result.getTip();

      setTimeout(() => (this.isAnimating = false), 400);
    });

    this.uiService.canReset$.subscribe((canReset) => (this.isDirty = canReset));
  }

  reset() {
    this.isDirty = false;
    this.isAnimating = false;

    this.uiService.setCanReset(false);
    this.uiService.updateOutput({ bill: 0, tip: 0, numberOfPeople: 1 });
  }
}
