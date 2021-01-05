import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CheckStatusForTokenUpdating } from 'src/app/core/userState/user-actions';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CheckStatusForTokenUpdating);
  }

}
