import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-thing',
  templateUrl: './full-thing.component.html',
  styleUrls: ['./full-thing.component.scss']
})
export class FullThingComponent implements OnInit {

  adminView = false;
  constructor() { }

  ngOnInit(): void {
  }

}
