import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.subscription = auth.user$.subscribe((user) => {
      if (!user) return;
      //salvando (realmente haciendo un update para que no se registre muchas veces) del usuario que hizo login
      userService.save(user);

      //redirigiendo a la return url si hay una:
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl as string);
    });
  }

  //desuscribirse al observable
  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }
}
