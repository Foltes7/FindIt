import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { ProfileResult } from '../models/profileResult';

@Injectable()
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(username: string): Observable<ProfileResult>
  {
    return this.httpClient.get<ProfileResult>(environment.writeAPI + `/api/profile/${username}`);
  }

  setDefaultAccount(): Observable<any>
  {
    return this.httpClient.get(environment.writeAPI + `/api/profile/account/default`);
  }

  setBussinessAccount(): Observable<any>
  {
    return this.httpClient.get(environment.writeAPI + `/api/profile/account/bussiness`);
  }
}
