import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { TipControllerComponent } from './components/tip-controller/tip-controller.component';
import { TipComponent } from './components/tip/tip.component';
import { FormsModule } from '@angular/forms';
import { OutputCardComponent } from './components/output-card/output-card.component';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TipControllerComponent,
    TipComponent,
    OutputCardComponent,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
