import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Project1Sub2Component } from './project1-sub2.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [Project1Sub2Component],
  declarations: [
    Project1Sub2Component,
  ],
})
export class AppProject1Sub2Module {}
