import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return this.auth.user$.pipe(
    // switchMap((user) => this.userService.get(user!.uid).valueChanges()),
    return this.auth.appUser$.pipe(map((appUser) => appUser!.isAdmin || false));
  }
}
