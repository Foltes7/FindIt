import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationModel } from '../models/authorizationModel';
import { ChangePasswordResponse } from '../models/changePasswordResponse';
import { ValidateResponse } from '../models/validateResponse';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }


  register(username: string, name: string, pass: string, confrimPass: string, email: string): Observable<any>
  {
    const obj = {
      username,
      name,
      password: pass,
      confirmPassword: confrimPass,
      email
    };
    return this.httpClient.post<any>(environment.writeAPI + '/api/Auth/registration', obj);
  }

  login(username: string, pass): Observable<AuthorizationModel>
  {
    const obj = {
      username,
      password: pass,
    };
    return this.httpClient.post<AuthorizationModel>(environment.writeAPI + '/api/Auth/login', obj);
  }

  logout(): Observable<any>
  {
    return this.httpClient.post(environment.writeAPI + '/api/Auth/logout', null);
  }

  refreshToken(refreshToken: string): Observable<any>
  {
    const obj = {
      refreshToken
    };
    return this.httpClient.post<AuthorizationModel>(environment.writeAPI + '/api/Auth/refresh-token', obj);
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

  changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<ChangePasswordResponse>
  {
    const obj = {
      oldPassword,
      newPassword,
      confirmNewPassword
    };
    return this.httpClient.post<ChangePasswordResponse>(environment.writeAPI + `/api/Auth/restore`, obj);
  }
}
