import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/types';
import * as JWT from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null)

  constructor(private tokenService: TokenService) {

    if (this.tokenService.possuiToken()){
      this.decodificarJWT()
    }
  }
  decodificarJWT(): void {
    const token = this.tokenService.retornarToken()
    const user = JWT.jwtDecode(token) as User
    this.userSubject.next(user)
  }

  retornarUser(){
    return this.userSubject.asObservable()

  }
  salvarToken(token:string){
    this.tokenService.salvarToken(token)
    this.decodificarJWT()
  }
  logout(){
    this.tokenService.excluirToken()
    this.userSubject.next(null)
  }
  isLogged(){
    return this.tokenService.possuiToken()
  }

}

