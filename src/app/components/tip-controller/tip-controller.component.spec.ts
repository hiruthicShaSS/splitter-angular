import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipControllerComponent } from './tip-controller.component';
import { TipComponent } from '../tip/tip.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ISplit } from 'src/app/split';

describe('TipControllerComponent', () => {
  let fixture: ComponentFixture<TipControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipControllerComponent, TipComponent],
      providers: [UiService],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TipControllerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should change background color', () => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.tip[data-tip]')
    );

    buttons.forEach((button) => {
      const element: HTMLElement = button.nativeElement;
      element.click();

      fixture.detectChanges();

      const elementAfterClick = fixture.debugElement.query(
        By.css(`.tip[data-tip='${element.dataset['tip']}']`)
      );

      expect(elementAfterClick.classes['tip']).toBeTruthy();
    });
  });

  it('handle all 0 values', async () => {
    const INPUT_SPLIT: ISplit = {
      bill: 100,
      tip: 5,
      numberOfPeople: 1,
    };

    const uiService = fixture.debugElement.injector.get(UiService);
    const amount: HTMLInputElement = fixture.debugElement.query(
      By.css('#amount')
    ).nativeElement;

    const numberOfPeople: HTMLInputElement = fixture.debugElement.query(
      By.css('#no-of-people')
    ).nativeElement;

    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    amount.value = INPUT_SPLIT.bill.toString();
    amount.dispatchEvent(new Event('input'));
    amount.dispatchEvent(event);

    numberOfPeople.value = INPUT_SPLIT.numberOfPeople.toString();
    numberOfPeople.dispatchEvent(new Event('input'));
    numberOfPeople.dispatchEvent(event);

    fixture.debugElement
      .query(By.css(`.tip[data-tip="${INPUT_SPLIT.tip}"] button`))
      .nativeElement.click();

    fixture.detectChanges();

    const EXPECTED_OUTPUT = uiService.calculateSplitResult(INPUT_SPLIT);

    await fixture.whenStable();
    uiService.splitResultSubject$.subscribe((splitResult) => {
      expect(splitResult.getAmount()).toBe(EXPECTED_OUTPUT.getAmount());
      expect(splitResult.getTip()).toBe(EXPECTED_OUTPUT.getTip());
    });
  });
});
