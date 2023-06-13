import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipComponent } from './tip.component';

describe('TipComponent', () => {
  let component: TipComponent;
  let fixture: ComponentFixture<TipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipComponent]
    });
    fixture = TestBed.createComponent(TipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
