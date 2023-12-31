import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { ISplit } from 'src/app/split';
import { TipComponent } from '../tip/tip.component';
import { TipControllerComponent } from './tip-controller.component';

describe('TipControllerComponent', () => {
  let fixture: ComponentFixture<TipControllerComponent>;
  let splitSubscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipControllerComponent, TipComponent],
      providers: [UiService],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TipControllerComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    splitSubscription?.unsubscribe();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
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

  it('perform calculations for the input', async () => {
    const INPUT_SPLIT: ISplit = {
      bill: 100,
      tip: 5,
      numberOfPeople: 1,
    };

    const uiService = fixture.debugElement.injector.get(UiService);

    interactWithComponenet(INPUT_SPLIT);

    const EXPECTED_OUTPUT = uiService.calculateSplitResult(INPUT_SPLIT);

    await fixture.whenStable();
    splitSubscription = uiService.splitResultSubject$.subscribe(
      (splitResult) => {
        expect(splitResult.getAmount()).toBe(EXPECTED_OUTPUT.getAmount());
        expect(splitResult.getTip()).toBe(EXPECTED_OUTPUT.getTip());
      }
    );
  });

  it('handle 0 values', async () => {
    const INPUT_SPLIT: ISplit = {
      bill: 0,
      tip: 5,
      numberOfPeople: 0,
    };

    const uiService = fixture.debugElement.injector.get(UiService);

    interactWithComponenet(INPUT_SPLIT);

    const EXPECTED_OUTPUT = uiService.calculateSplitResult(INPUT_SPLIT);

    await fixture.whenStable();
    splitSubscription = uiService.splitResultSubject$.subscribe(
      (splitResult) => {
        expect(splitResult.getAmount()).toBe(EXPECTED_OUTPUT.getAmount());
        expect(splitResult.getTip()).toBe(EXPECTED_OUTPUT.getTip());
      }
    );
  });

  it('updates tip in the component on click', fakeAsync(() => {
    const tip: DebugElement = fixture.debugElement.query(
      By.css('.tip[data-tip]')
    );

    fixture.debugElement
      .query(By.css('.tip[data-tip] button'))
      .nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.split.tip).toBe(
      parseInt(tip.nativeElement.dataset['tip']!)
    );
  }));

  it('should reset the input fields', () => {
    const INPUT_SPLIT: ISplit = {
      bill: 100,
      tip: 5,
      numberOfPeople: 2,
    };

    const amountElement = fixture.debugElement.query(By.css('input#amount'));
    const numberOfElement = fixture.debugElement.query(
      By.css('input#no-of-people')
    );

    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    amountElement.nativeElement.value = INPUT_SPLIT.bill;
    amountElement.nativeElement.dispatchEvent(event);

    numberOfElement.nativeElement.value = INPUT_SPLIT.tip;
    numberOfElement.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    fixture.componentInstance.reset();
    fixture.detectChanges();
  });

  it('should toggle on click', () => {
    const tip: HTMLElement = fixture.debugElement.query(
      By.css('.tip')
    ).nativeElement;

    console.log(tip);

    tip.click();
    tip.dispatchEvent(new Event('click'));
    fixture.debugElement.query(By.css('.tip')).triggerEventHandler('click');
    fixture.detectChanges();

    console.log(
      fixture.debugElement.query(By.css('app-tip')).componentInstance
    );
  });

  const interactWithComponenet = (split: ISplit) => {
    const amount: HTMLInputElement = fixture.debugElement.query(
      By.css('#amount')
    ).nativeElement;

    const numberOfPeople: HTMLInputElement = fixture.debugElement.query(
      By.css('#no-of-people')
    ).nativeElement;

    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    amount.value = split.bill.toString();
    amount.dispatchEvent(new Event('input'));
    amount.dispatchEvent(event);

    numberOfPeople.value = split.numberOfPeople.toString();
    numberOfPeople.dispatchEvent(new Event('input'));
    numberOfPeople.dispatchEvent(event);

    if (split.tip !== 0) {
      fixture.debugElement
        .query(By.css(`.tip[data-tip="${split.tip}"] button`))
        .nativeElement.click();
    }

    fixture.detectChanges();
  };
});
