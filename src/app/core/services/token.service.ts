import { Injectable } from '@angular/core';
import { local } from 'd3-selection';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly KEY = 'token'; // Define the key here

  constructor() { }

  salvarToken(token:string) {
    return localStorage.setItem(this.KEY, token)
  }

  excluirToken() {
    localStorage.removeItem(this.KEY) 
  }
  retornarToken(){
    return localStorage.getItem(this.KEY) ?? ""
  }
  possuiToken(){
    return !!this.retornarToken();

  }

}
