import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlexyStepperDone } from '../../flexy-stepper/stepper.interface';

@Component({
  selector: 'app-project1-sub2',
  templateUrl: './project1-sub2.component.html',
  styleUrls: ['./project1-sub2.component.css'],
})
export class Project1Sub2Component implements OnInit {
  @Input() payload: any;
  @Input() options?: any;
  @Output() done: EventEmitter<IFlexyStepperDone> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  gotoNext(): void {
    this.done.emit({
      payload: {
        ...this.payload,
        sub2: (this.payload.sub2 || 0) + 1,
      },
      goto: 'project1-sub1',
      is_stop_back: true,
    });
  }

  gotoNextWithCheckpoint(): void {
    this.done.emit({
      payload: {
        ...this.payload,
        sub2: (this.payload.sub2 || 0) + 1,
      },
      goto: 'project1-sub1',
      is_checkpoint: true,
    });
  }

  gotoBack(): void {
    this.done.emit({
      goto: 'back',
    });
  }
}
