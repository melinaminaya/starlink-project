import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<User | null>;
  constructor(private userService: UserService,
    private router: Router
  ){
    this.user$ = this.userService.getUser();
    this.user$ = this.userService.retornarUser()
  }
  logout() {
    this.userService.setUser(null);  // Exemplo de logout
    this.userService.logout();
    this.router.navigate([''])  
  }
}
