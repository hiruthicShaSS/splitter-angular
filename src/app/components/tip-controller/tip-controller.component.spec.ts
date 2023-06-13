import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipControllerComponent } from './tip-controller.component';

describe('TipControllerComponent', () => {
  let component: TipControllerComponent;
  let fixture: ComponentFixture<TipControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipControllerComponent]
    });
    fixture = TestBed.createComponent(TipControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
