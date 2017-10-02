import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  @Input() valueCounter: number;
  @Output() eventCounter = new EventEmitter();

  increase(): void {
    this.valueCounter++;
    this.eventCounter.emit(this.valueCounter);
  }

  decrease(): void {
    this.valueCounter--;
    this.eventCounter.emit(this.valueCounter);
  }
}
