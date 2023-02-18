import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FlexyComponentDirective } from './flexy-component.directive';

@Component({
  selector: 'flexy-component',
  template: '<ng-template flexyComponent></ng-template>',
})
export class FlexyComponentComponent implements OnInit, AfterViewInit {
  @Input() component: any;
  @Input() payload: any;
  @Input() options?: any;
  @Output() done: EventEmitter<any> = new EventEmitter();

  @ViewChild(FlexyComponentDirective, { static: true })
  container: FlexyComponentDirective;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const viewContainerRef = this.container.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.component);
    componentRef.instance['payload'] = this.payload;
    componentRef.instance['done'] = this.done;
    if (this.options) {
      componentRef.instance['options'] = this.options;
    }

    this.cdRef.detectChanges();
  }
}
