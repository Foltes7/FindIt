import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogOutUser } from 'src/app/core/userState/user-actions';
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
  constructor(private unsplashService: UnsplashService,
              private store: Store,
              private router: Router,
              private authService: AuthService, ) { }


  ngOnInit(): void {
    // this.unsplashService.getProfile().subscribe(x => this.user = x.user);
  }

  async logOut()
  {
    await this.authService.logout().toPromise();
    await this.store.dispatch(new LogOutUser()).toPromise();
    this.router.navigate(['/about']);
  }

}
