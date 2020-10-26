import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thing } from '../profile/thingsPage/models/thing';

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

  getPost(): Observable<Thing[]> {
    const headers = new HttpHeaders().set('Authorization', 'Client-ID ' + this.publicKey); // create header object
    const url = `https://api.unsplash.com/collections?per_page=100`;
    return this.httpClient.get<any>(url, {headers}).pipe(map((z) => {
      return z.map(x => {
        const obj: Thing = {
          titleLong: x.description,
          titleShort: x.title,
          photo: x.cover_photo?.urls.regular,
          date: x.updated_at,
          counterLike: Math.floor(Math.random() * 100000) + 1,
          counterMesagges: Math.floor(Math.random() * 100000) + 1,
          counterView: Math.floor(Math.random() * 10000000) + 1
        };
        return obj;
      });
    }));
  }

}
