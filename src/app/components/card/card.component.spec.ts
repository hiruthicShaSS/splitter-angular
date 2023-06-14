import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { TipControllerComponent } from '../tip-controller/tip-controller.component';
import { OutputCardComponent } from '../output-card/output-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        TipControllerComponent,
        OutputCardComponent,
      ],
    });

    fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
