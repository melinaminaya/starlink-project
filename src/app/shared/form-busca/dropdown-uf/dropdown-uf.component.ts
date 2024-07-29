import { Component, Input, OnInit } from '@angular/core';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/types';

@Component({
  selector: 'app-dropdown-uf',
  imports: [],
  templateUrl: './dropdown-uf.component.html',
  styleUrl: './dropdown-uf.component.scss'
})
export class DropdownUfComponent implements OnInit {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';

  unidadesFederativas: UnidadeFederativa[] = []
  filteredOptions = []

  constructor(private unidadeFederativaService: UnidadeFederativaService) {

  }
  ngOnInit(){
    this.unidadeFederativaService.listar().subscribe((dados: UnidadeFederativa[]) => {
      this.unidadesFederativas = dados
      console.log(this.unidadesFederativas)
    })
  }
}
