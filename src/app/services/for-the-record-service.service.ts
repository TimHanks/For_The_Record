import { Injectable } from '@angular/core';
import { ForTheRecordNumber } from '../classes/for-the-record-number';
import { interval, timer, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { Big } from 'big.js';


@Injectable({
  providedIn: 'root'
})
export class ForTheRecordServiceService {

  ForTheRecordNumberList : ForTheRecordNumber[];
  Timer: Observable<number>;
  TimerSubscription : Subscription;
  Interval: Observable<void>;
  IntervalSubscription : Subscription;

  constructor() { 
    this.ForTheRecordNumberList = [];
  }
  
  public addNewNumber(newNumber : string){  
    let currentForTheRecordNumber = this.ForTheRecordNumberList.find(a => a.ftrNumber == newNumber);
    if (!currentForTheRecordNumber){
      this.ForTheRecordNumberList.push(new ForTheRecordNumber(newNumber));
    }
    else {
      currentForTheRecordNumber.increaseFrequency();
    }
  }

  public getCurrentNumberList() : string {
    this.ForTheRecordNumberList = this.ForTheRecordNumberList.sort((a,b) => b.frequency - a.frequency);
    return this.ForTheRecordNumberList.map(a => a.ftrNumber + ':' + a.frequency).join(', ');
  }

  //This is a formula that will tell if a number is in the fibonacci sequence.  
  //Trying to calculate a high integer won't work well using traditional recursive methods.
  public isThisAFibonacciNumber (num: Big):boolean {

    if (this.isPerfectSquare(new Big(5).mul(num.mul(num)).minus(new Big(4))) 
    || this.isPerfectSquare(new Big(5).mul(num.mul(num)).plus(new Big(4)))) {
        return true;
    } 
    else { 
      return false; 
    }
  }

  private isPerfectSquare(num : Big) : boolean {
    return num > new Big(0) &&  num.sqrt().mod(new Big(1)).toString() === "0";
  }

  public setTimer(num: number) {  
    this.Timer = timer(1000, 1000);
    this.Interval = interval(num * 1000).pipe(
      map((x) => { })
    );
  }

}
