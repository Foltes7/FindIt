import { Component, OnInit } from '@angular/core';
import { UnsplashService } from 'src/app/shared/unsplash.service';

@Component({
  selector: 'app-profile-in-profile',
  templateUrl: './profile-in-profile.component.html',
  styleUrls: ['./profile-in-profile.component.scss']
})
export class ProfileInProfileComponent implements OnInit {

  followed = false;
  admin = true;
  user: any;
  constructor(private unsplashService: UnsplashService) { }

  ngOnInit(): void {
    // this.unsplashService.getProfile().subscribe(x => this.user = x.user);
  }

}
