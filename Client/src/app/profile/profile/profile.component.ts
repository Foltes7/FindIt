import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UnsplashService } from 'src/app/shared/unsplash.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  followed = false;
  admin = false;
  user: any;
  constructor(private unsplashService: UnsplashService) { }

  ngOnInit(): void {
    // this.unsplashService.getProfile().subscribe(x => this.user = x.user);
  }

}
