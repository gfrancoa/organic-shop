import { Component } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth) {}

  // login() {
  //   this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  //   // .then((result) => {
  //   //   console.log('You have been successfully logged in!');
  //   // })
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });
  // }

  async login() {
    return await this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this.afAuth
      .signInWithRedirect(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log('this is the error login', error);
      });
  }
}
