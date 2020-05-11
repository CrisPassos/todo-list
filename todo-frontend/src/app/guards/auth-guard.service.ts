
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserServices } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public user: UserServices, public router: Router) { }

  canActivate(): boolean {
    console.log(this.user.isAutheticate());

    if (!this.user.isAutheticate()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
