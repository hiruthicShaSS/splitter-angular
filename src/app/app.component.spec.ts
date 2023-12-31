import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { OutputCardComponent } from './components/output-card/output-card.component';
import { TipControllerComponent } from './components/tip-controller/tip-controller.component';
import { TipComponent } from './components/tip/tip.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [
        AppComponent,
        CardComponent,
        TipControllerComponent,
        OutputCardComponent,
        TipComponent,
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(component.title).toContain('splitter-angular');
  });

  it('should render the card', () => {
    expect(debugElement.query(By.css('.card'))).toBeTruthy();
  });
});
