import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.scss']
})
export class ClickableComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  textColor: string;


  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  borderColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
