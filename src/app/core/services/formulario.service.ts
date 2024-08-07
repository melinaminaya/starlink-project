import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
cadastroForm:FormGroup | null = null

getCadastro(){
  return this.cadastroForm
}

setCadastro(form:FormGroup){
  this.cadastroForm = form;
}
  constructor() { }
}
