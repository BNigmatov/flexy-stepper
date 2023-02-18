import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { FlexyComponentComponent } from './flexy-component.component';
import { FlexyComponentDirective } from './flexy-component.directive';

@NgModule({
  imports: [CommonModule, MatTabsModule],
  declarations: [FlexyComponentComponent, FlexyComponentDirective],
  exports: [FlexyComponentComponent, FlexyComponentDirective],
})
export class FlexyComponentModule {}
