import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from './intercepter.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    IntercepterService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    },
  ]
})
export class CoreModule { }
