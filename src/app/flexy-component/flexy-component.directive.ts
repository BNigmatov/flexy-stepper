import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[flexyComponent]',
})
export class FlexyComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
