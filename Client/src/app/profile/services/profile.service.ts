import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(username: string): Observable<Profile>
  {
    return this.httpClient.get<Profile>(environment.writeAPI + `/api/profile/${username}`);
  }
}
