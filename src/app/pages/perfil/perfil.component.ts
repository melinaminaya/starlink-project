import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { User } from 'src/app/core/types/types';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  title = 'Olá, '
  text = 'ATUALIZAR'
  perfilComponent = true

  token = ''
  nome = ''
  cadastro!: User
  form!: FormGroup<any> | null

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private userService: UserService,

  ) { }
  ngOnInit(): void {
    this.token = this.tokenService.retornarToken()
    this.cadastroService.buscarCadastro(
      // this.token
    ).subscribe(cadastro => {
      this.cadastro = cadastro
      this.nome = this.cadastro.nome
      this.carregarFormulario()
    })
  }

  carregarFormulario(): void {
    this.form = this.formularioService.getCadastro()
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero: this.cadastro.genero
    })
  }

  deslogar() {
    console.log('Logout com sucesso');
    this.userService.logout()
    this.router.navigate(['/'])
  }
  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado,
      genero: this.form?.value.genero
    }
    this.cadastroService.editarCadastro(dadosAtualizados
      // , this.token
    ).subscribe({
      next: ()=> {
        alert('Cadastro atualizado com sucesso')
        this.router.navigate(['/home'])
      },
      error: (err) =>{
        console.log("Erro ao atualizar cadastro",)
      }
    })
  }
}
