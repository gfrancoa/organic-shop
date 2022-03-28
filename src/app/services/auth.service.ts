import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from 'firebase/auth';
import { Observable, switchMap, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState as Observable<User>;
  }

  login() {
    //si existe un query param llamado returnUrl va a almacenar la ruta en esa variable
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    //almacenando la ruta en local storage
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then((resp) => {
      //ESTE THEN NO FUNCIONA. NO SE SABE SI ES UN BUG DE GOOGLE
      // console.log('i signed in', resp);
      // let localReturnUrl = localStorage.getItem('returnUrl');
      // this.router.navigateByUrl(localReturnUrl as string);
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user!.uid).valueChanges();
        return of(null);
      })
    );
  }
}
