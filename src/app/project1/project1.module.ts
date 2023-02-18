import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexyStepperModule } from '../flexy-stepper/stepper.module';
import { AppProject1Component } from './project1.component';
import { AppProject1Sub1Module } from './project1-sub1/project1-sub1.module';
import { AppProject1Sub2Module } from './project1-sub2/project1-sub2.module';

@NgModule({
  imports: [
    CommonModule,
    FlexyStepperModule,
    AppProject1Sub1Module,
    AppProject1Sub2Module,
  ],
  exports: [AppProject1Component],
  declarations: [AppProject1Component],
})
export class AppProject1Module {}
