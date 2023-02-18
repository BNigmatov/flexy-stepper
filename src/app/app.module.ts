import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppProject1Module } from './project1/project1.module';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    AppProject1Module,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap:    [
    AppComponent,
  ]
})
export class AppModule { }
