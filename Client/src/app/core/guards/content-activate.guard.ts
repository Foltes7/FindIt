import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStore } from '../userState/user-state';

@Injectable({
  providedIn: 'root'
})
export class ContentActivateGuard implements CanActivate {

  constructor(private store: Store,
              private router: Router)
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = this.store.selectSnapshot(UserStore.isLogin);
    if (isLogin){
      return true;
    }else{
      this.router.navigate(['/about']);
    }
    return false;
  }

}
