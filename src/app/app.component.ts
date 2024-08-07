import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidenav = false;

  constructor() {}

  // ngOnInit(): void {
  //   this.authService.isLoggedIn$.subscribe(isLoggedIn => {
  //     this.showSidenav = isLoggedIn;
  //   });
  // }
}
