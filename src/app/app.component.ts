import { Component } from '@angular/core';
import { ForTheRecordServiceService } from './services/for-the-record-service.service';
import { Subscription } from 'rxjs';
import { Big } from 'big.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  numberText: string;
  toggleText: string;
  newNumber : string;
  timerPeriod : string;
  timerPeriodSet : number;
  timerSubscription : Subscription;
  intervalSubscription : Subscription;
  numberListText: string;
  timerTickCount: number;
  

  constructor(private _forTheRecordService: ForTheRecordServiceService) {
    this.title = 'For The Record';
    this.numberText = 'first';   
    this.toggleText = 'Halt';
    this.timerTickCount = 0;
  }

  updateTimerPeriod(){
    if (this.timerPeriod){
      this._forTheRecordService.setTimer(+this.timerPeriod);
      this.timerPeriodSet = +this.timerPeriod;
      this.timerPeriod = "";
      if (this.timerSubscription) this.timerSubscription.unsubscribe();
      this.timerSubscription = this._forTheRecordService.Timer.subscribe(t => {
        this.timerTickCount++;
        if(!(this.timerTickCount % this.timerPeriodSet)){
          this.displayNumberSequences();
        }
      });
    }
  }

  addNumber(){
    if (!this.newNumber) return;
    if(this._forTheRecordService.isThisAFibonacciNumber(new Big(this.newNumber))) alert("FIB!");
    this._forTheRecordService.addNewNumber(this.newNumber);
    this.numberText = "next"
    this.newNumber = "";
  }

  displayNumberSequences(){
    this.numberListText = this._forTheRecordService.getCurrentNumberList();
  }

  toggleTimer(){
    if (this.timerSubscription){
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
      this.toggleText = 'Resume';
    }
    else {
      this.timerSubscription = this._forTheRecordService.Timer.subscribe(t => {
        this.timerTickCount++;
        if(!(this.timerTickCount % this.timerPeriodSet)){
          this.displayNumberSequences();
        }
      });
      this.toggleText = 'Halt';
    }
  }
  onKeyNumber(event: any) { 
    if(event.key == "Enter") this.addNumber();
    
  }
  onKeyPeriod(event: any) { 
    if(event.key == "Enter") this.updateTimerPeriod();  
  }

}
