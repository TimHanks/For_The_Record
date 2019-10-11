import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ForTheRecordServiceService } from './services/for-the-record-service.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: ForTheRecordServiceService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ForTheRecordServiceService]
    }).compileComponents();
    service = TestBed.get(ForTheRecordServiceService);
    component = new AppComponent(service);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'For The Record'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('For The Record');
  });

  it('#updateTimerPeriod should update the period to match the input value', () => {
    expect(component.timerPeriod).toBeFalsy();
    expect(component.timerPeriodSet).toBeFalsy();
    component.timerPeriod = '1';
    expect(component.timerPeriodSet).toBeFalsy();
    component.updateTimerPeriod();
    expect(component.timerPeriodSet).toEqual(1);
    expect(service.Timer).toBeTruthy();
    expect (component.timerSubscription).toBeTruthy();
    
  });

  it('#addNumber should add a number to the number list', () => {
    component.newNumber = "3";
    component.addNumber();
    expect(service.getCurrentNumberList()).toEqual('3:1')
    component.newNumber = "3";
    component.addNumber();
    expect(service.getCurrentNumberList()).toEqual('3:2')
    component.newNumber = "26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626";
    component.addNumber();
    expect(service.getCurrentNumberList()).toEqual('3:2, 26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626:1')
      
  });

  it('#displayNumberSequences should display the current number list', () => {
    component.newNumber = "3";
    component.addNumber();
    component.displayNumberSequences()
    expect(component.numberListText).toEqual('3:1')
    component.newNumber = "3";
    component.addNumber();
    component.displayNumberSequences()
    expect(component.numberListText).toEqual('3:2')
    component.newNumber = "26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626";
    component.addNumber();
    component.displayNumberSequences()
    expect(component.numberListText).toEqual('3:2, 26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626:1')
  });

  it('#toggleTimer should turn the timer on and off', () => {

    expect(component.toggleText).toEqual("Halt");
    expect(component.timerSubscription).toBeFalsy();
    component.timerPeriod = '1';
    component.updateTimerPeriod();
    expect(component.toggleText).toEqual("Halt");
    expect(component.timerSubscription).toBeTruthy();
    component.toggleTimer();
    expect(component.toggleText).toEqual("Resume");
    expect(component.timerSubscription).toBeFalsy();
    component.toggleTimer();
    expect(component.toggleText).toEqual("Halt");
    expect(component.timerSubscription).toBeTruthy();
});

it('#onKeyNumber should call #AddNumber on Enter Key input', () => {
    component.timerPeriod = '1'
    component.updateTimerPeriod();
    component.newNumber = '5';
    let eventMock = {key: '1'};
    component.onKeyNumber(eventMock);
    expect(service.getCurrentNumberList()).toEqual('');
    eventMock = {key: 'Enter'};
    component.onKeyNumber(eventMock);
    expect(service.getCurrentNumberList()).toEqual('5:1');
});

it('#onKeyPeriod should call #updateTimerPeriod on Enter Key input', () => {
    component.timerPeriod = '1'
    let eventMock = {key: '1'};
    component.onKeyPeriod(eventMock);
    expect(component.timerPeriodSet).toBeFalsy();
    expect(service.Timer).toBeFalsy();
    expect (component.timerSubscription).toBeFalsy();
    eventMock = {key: 'Enter'};
    component.onKeyPeriod(eventMock);
    expect(component.timerPeriodSet).toEqual(1);
    expect(service.Timer).toBeTruthy();
    expect (component.timerSubscription).toBeTruthy();
});

});
