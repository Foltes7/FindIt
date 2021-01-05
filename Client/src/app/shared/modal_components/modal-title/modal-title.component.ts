import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-title',
  templateUrl: './modal-title.component.html',
  styleUrls: ['./modal-title.component.scss']
})
export class ModalTitleComponent implements OnInit {

  @Output()
  closeEvent = new EventEmitter<void>();

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

  close(): void
  {
    this.closeEvent.emit();
  }

}
