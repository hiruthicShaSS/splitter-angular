import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCardComponent } from './output-card.component';
import { UiService } from 'src/app/services/ui.service';
import { By } from '@angular/platform-browser';
import { ISplit } from 'src/app/split';
import { CurrencyPipe } from 'src/app/pipes/currency.pipe';

describe('OutputCardComponent', () => {
  let component: OutputCardComponent;
  let fixture: ComponentFixture<OutputCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputCardComponent],
    });
    fixture = TestBed.createComponent(OutputCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update output values', () => {
    const uiService = fixture.debugElement.injector.get(UiService);
    fixture.detectChanges();
    const currencyPipe: CurrencyPipe = new CurrencyPipe();

    const INPUT_SPLIT: ISplit = {
      bill: 100,
      tip: 5,
      numberOfPeople: 2,
    };
    const EXPECTED_OUTPUT = uiService.calculateSplitResult(INPUT_SPLIT);

    uiService.updateOutput(INPUT_SPLIT);
    fixture.detectChanges();

    const amountElement = fixture.debugElement.query(By.css('#output-total'));
    const tipElement = fixture.debugElement.query(By.css('#output-tip'));

    expect(amountElement.nativeElement.innerText).toContain(
      currencyPipe.transform(EXPECTED_OUTPUT.getAmount().toString())
    );
    expect(tipElement.nativeElement.innerText).toContain(
      currencyPipe.transform(EXPECTED_OUTPUT.getTip().toString())
    );
  });

  it('reset button resets the output data', () => {
    const uiService = fixture.debugElement.injector.get(UiService);
    fixture.debugElement.query(By.css('.btn-reset')).nativeElement.click();
    fixture.detectChanges();

    const currencyPipe: CurrencyPipe = new CurrencyPipe();

    const INPUT_SPLIT: ISplit = {
      bill: 0,
      tip: 0,
      numberOfPeople: 1,
    };
    const EXPECTED_OUTPUT = uiService.calculateSplitResult(INPUT_SPLIT);

    const amountElement = fixture.debugElement.query(By.css('#output-total'));
    const tipElement = fixture.debugElement.query(By.css('#output-tip'));

    expect(amountElement.nativeElement.innerText).toContain(
      currencyPipe.transform(EXPECTED_OUTPUT.getAmount().toString())
    );
    expect(tipElement.nativeElement.innerText).toContain(
      currencyPipe.transform(EXPECTED_OUTPUT.getTip().toString())
    );
  });
});
