import { Component } from '@angular/core';
import { IFlexyStepperStep } from '../flexy-stepper/stepper.interface';
import { Project1Sub1Component } from './project1-sub1/project1-sub1.component';
import { Project1Sub2Component } from './project1-sub2/project1-sub2.component';

@Component({
  selector: 'app-project1',
  templateUrl: './project1.component.html',
  styleUrls: ['./project1.component.scss'],
})
export class AppProject1Component {
  steps: IFlexyStepperStep[] = [
    {
      key: 'project1-sub1',
      // title: $localize`:@@app-step1:Вкладка 1`,
      title: 'Вкладка 1',
      component: Project1Sub1Component,
    },
    {
      key: 'project1-sub2',
      title: 'Вкладка 2',
      component: Project1Sub2Component,
    },
  ];
}
