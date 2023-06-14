import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipComponent } from './tip.component';
import { By } from '@angular/platform-browser';

describe('TipComponent', () => {
  let component: TipComponent;
  let fixture: ComponentFixture<TipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipComponent],
    });
    fixture = TestBed.createComponent(TipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle on click', () => {
    const tip: HTMLElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    tip.click();
    tip.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.isActive).toBeTruthy();
  });
});
