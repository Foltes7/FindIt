import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  publicKey = 'pe-plgKKLz--FtmDdv-n6ERW87Em255E9Y5WZqx2Oog';
  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<any> {
    const url = `https://api.unsplash.com/photos/random/?client_id=${this.publicKey}`;
    return this.httpClient.get(url);
  }

}
