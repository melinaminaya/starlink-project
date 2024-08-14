import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  title = 'Olá Você!'
  text = 'ATUALIZAR'
  perfilComponent = true

  deslogar() {
    console.log('Logout com sucesso');
  }
  atualizar(){
    console.log('Atualizado perfil com sucesso');

  }
}
