import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Project1Sub1Component } from './project1-sub1.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [Project1Sub1Component],
  declarations: [
    Project1Sub1Component,
  ],
})
export class AppProject1Sub1Module {}
