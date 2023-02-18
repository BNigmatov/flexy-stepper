import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlexyStepperDone } from '../../flexy-stepper/stepper.interface';

@Component({
  selector: 'appswdfsdfsd-project1-sub1',
  templateUrl: './project1-sub1.component.html',
  styleUrls: ['./project1-sub1.component.css']
})
export class Project1Sub1Component implements OnInit {
  @Input() payload: any;
  @Input() options?: any;
  @Output() done: EventEmitter<IFlexyStepperDone> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  gotoNext(): void {
    this.done.emit({
      payload: {
        ...this.payload,
        sub1: (this.payload.sub1 || 0) + 1,
      },
      goto: 'project1-sub2',
    });
  }

  cancel(): void {
    this.done.emit({
      goto: 'cancel',
    });
  }

}