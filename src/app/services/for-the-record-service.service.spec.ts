import { TestBed } from '@angular/core/testing';
import { ForTheRecordServiceService } from './for-the-record-service.service';
import { FormsModule } from '@angular/forms';
import { Big } from 'big.js';

describe('ForTheRecordServiceService', () => {
  let service: ForTheRecordServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ FormsModule ],
    declarations: [],
    providers:[]}); service = new ForTheRecordServiceService();
  });

  it('should be created', () => {
    const service: ForTheRecordServiceService = TestBed.get(ForTheRecordServiceService);
    expect(service).toBeTruthy();
  });

  it('#getCurrentNumberList should return real value', () => {
    expect(service.getCurrentNumberList()).toBe('');
  });

  it('#addNewNumber should properly add numbers to the numberlist', () => {
    service.addNewNumber("15")
    expect(service.getCurrentNumberList()).toBe('15:1');
    service.addNewNumber("10")
    expect(service.getCurrentNumberList()).toBe('15:1, 10:1');
    service.addNewNumber("10")
    expect(service.getCurrentNumberList()).toBe('10:2, 15:1');
    service.addNewNumber("8")
    expect(service.getCurrentNumberList()).toBe('10:2, 15:1, 8:1');
  });

  it('#isThisAFibonacciNumber should be able to identify Fibonacci Numbers', () => {
    expect(service.isThisAFibonacciNumber(new Big('0'))).toEqual(true);
    expect(service.isThisAFibonacciNumber(new Big('1'))).toEqual(true);
    expect(service.isThisAFibonacciNumber(new Big('2'))).toEqual(true);
    expect(service.isThisAFibonacciNumber(new Big('5'))).toEqual(true);
    expect(service.isThisAFibonacciNumber(new Big('6'))).toEqual(false);
    expect(service.isThisAFibonacciNumber(new Big('10'))).toEqual(false);
    expect(service.isThisAFibonacciNumber(new Big('55'))).toEqual(true);
    expect(service.isThisAFibonacciNumber(new Big('56'))).toEqual(false);
    expect(service.isThisAFibonacciNumber(new Big('26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626'))).toEqual(true);
  });


  it('#setTimer should return intiate Timer and return a subscriptin value', (done: DoneFn) => {
     service.setTimer(1);
     service.Timer.subscribe(value => {
       expect(value).toEqual(0);      
       done();
     });
    });
  });





