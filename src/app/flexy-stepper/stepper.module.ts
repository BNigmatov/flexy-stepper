import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import {
  FlexyStepperComponent,
} from './stepper.component';
import { FlexyComponentModule } from '../flexy-component/flexy-component.module';

@NgModule({
  imports: [CommonModule, MatTabsModule, FlexyComponentModule],
  declarations: [FlexyStepperComponent],
  exports: [FlexyStepperComponent],
})
export class FlexyStepperModule {}
