import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginResponce';
import { ValidateResponse } from '../models/validateResponse';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  register(username: string, pass: string, confrimPass: string, email: string): Observable<any>
  {
    const obj = {
      username,
      password: pass,
      confirmPassword: confrimPass,
      email
    };
    return this.httpClient.post<any>(environment.writeAPI + '/api/Auth/registration', obj);
  }

  login(username: string, pass): Observable<LoginResponse>
  {
    const obj = {
      username,
      password: pass,
    };
    return this.httpClient.post<LoginResponse>(environment.writeAPI + '/api/Auth/login', obj);
  }

  validateEmailQuery(email: string): Observable<ValidateResponse>
  {
    const obj = {
      email
    };
    return this.httpClient.post<ValidateResponse>(environment.writeAPI + '/api/Auth/validate/email', obj);
  }

  validateUserNameQuery(username: string): Observable<ValidateResponse>
  {
    const obj = {
      username,
    };
    return this.httpClient.post<ValidateResponse>(environment.writeAPI + '/api/Auth/validate/username', obj);
  }
}
