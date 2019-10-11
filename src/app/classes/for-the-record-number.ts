import { Big } from 'big.js';
export class ForTheRecordNumber {
    public ftrNumber: string;
    public frequency: number;

    constructor(
        ftrNumber: string,
        frequency?: number      
    ){
        this.ftrNumber = ftrNumber;
        this.frequency = frequency ? frequency : 1;
    }
    
    /**
     * increaseFrequency
     * Increments Frequency By 1.
     */
    public increaseFrequency() {
        this.frequency ++;
    }
}
