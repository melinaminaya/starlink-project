import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { User } from 'src/app/core/types/types';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  perfilComponent = false

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router:Router
  ) {

  }
  cadastrar() {
    const formCadastro = this.formularioService.getCadastro()

    if(formCadastro?.valid){
      const novoCadastro = formCadastro.getRawValue() as User;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next:(value) =>{
          console.log('Cadastro realizado com sucesso', value)
          this.router.navigate([''])
          window.alert('Cadastro realizado com sucesso'); 

        },
        error:(err)=> {
          console.log('Erro ao realizar o cadastro', err)
            window.alert(`Erro ao realizar o cadastro: ${err}`); // Show alert on error
        },
      })
    }
  }
}
