import { Component, OnInit } from '@angular/core';
import { UnsplashService } from 'src/app/shared/unsplash.service';
import { Thing } from '../models/thing';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent implements OnInit {

  things: Thing[] = [];
  loaded = false;
  constructor(private unplashService: UnsplashService) { }

  ngOnInit(): void {
    this.unplashService.getPost()
    .subscribe(x => {
      this.things = x;
      this.loaded = true;
    });
  }

}
