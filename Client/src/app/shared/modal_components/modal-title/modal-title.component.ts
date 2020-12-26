import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-title',
  templateUrl: './modal-title.component.html',
  styleUrls: ['./modal-title.component.scss']
})
export class ModalTitleComponent implements OnInit {

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
