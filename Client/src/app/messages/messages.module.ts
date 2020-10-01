import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { MessagesRouting } from './messages-routing';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRouting
  ]
})
export class MessagesModule { }
