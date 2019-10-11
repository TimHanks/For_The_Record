import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegersOnlyDirective } from '../app/directives/integer-only.directive';
import { ForTheRecordServiceService } from './services/for-the-record-service.service';

@NgModule({
  declarations: [
    AppComponent,
    IntegersOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ForTheRecordServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
