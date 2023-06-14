import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipControllerComponent } from './tip-controller.component';
import { TipComponent } from '../tip/tip.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TipControllerComponent', () => {
  let component: TipControllerComponent;
  let fixture: ComponentFixture<TipControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipControllerComponent, TipComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TipControllerComponent);
    component = fixture.componentInstance;
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

      expect(elementAfterClick.classes["tip"]).toBeTruthy();
    });
  });
});
