import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/config';

import * as moment from 'moment';
import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class UserServices {
  private URL_REGISTER = `${Constants.baseURL}user/register`;
  private URL_AUTHORIZE = `${Constants.baseURL}user/authenticate`;

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(this.URL_REGISTER, user);
  }

  login(user: User) {
    this.isLoggedIn();
    return this.http.post<User>(this.URL_AUTHORIZE, user);
  }

  setSession(authResult) {
    const expiresIn = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiresIn', JSON.stringify(expiresIn.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.isLoggedOut();
  }


  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isAutheticate() {
    const token = localStorage.getItem('token') ? true : false;
    return token;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresIn');
    const expiresIn = JSON.parse(expiration);
    return moment(expiresIn);
  }







}
