import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from './intercepters/intercepter.service';
import { AuthService } from './services/auth.service';
import { UnauthorizedInterceptor } from './intercepters/unauthorized.interceptor';
import { ProfileService } from '../profile/services/profile.service';


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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    ProfileService
  ]
})
export class CoreModule { }
