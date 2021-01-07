import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UnsplashService } from 'src/app/shared/unsplash.service';
import { Profile } from '../models/profile';
import { GetProfile } from '../profileState/profile-actions';
import { ProfileStore } from '../profileState/profile-state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Select(ProfileStore.currentPageProfile)
  public profile$: Observable<Profile>;

  followed = false;
  admin = false;
  user: any;

  private routeSubscription: Subscription;
  private id: string;

  constructor(
    private unsplashService: UnsplashService,
    private route: ActivatedRoute,
    private store: Store
    ) {

    this.routeSubscription = route.params.subscribe(async (params) => {
      this.id = params.id;
      this.store.dispatch(new GetProfile(this.id));
    });

   }


  ngOnInit(): void {
    // this.unsplashService.getProfile().subscribe(x => this.user = x.user);
  }

}
