import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagensService } from 'src/app/core/services/passagens.service';
import { DadosBusca, Passagem } from 'src/app/core/types/types';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent implements OnInit {
  passagens: Passagem[] = [];
  constructor(private passagensService: PassagensService,
    private buscaService: FormBuscaService
  ){
    
  }
  ngOnInit(): void {
    const buscaPadrao:DadosBusca={
      dataIda: new Date().toISOString(),
      dataVolta: new Date().toISOString(),
      pagina:1,
      porPagina:25,
      somenteIda:false,
      passageirosAdultos:1,
      tipo: "Executiva"
    }
    const busca = this.buscaService.formEstaValido ? this.buscaService.obterDadosDeBusca() : buscaPadrao
    this.passagensService.getPassagens(busca)
    .pipe(take(1))
    .subscribe(res=>{
      console.log(res)
      this.passagens = res.resultado
      this.buscaService.formBusca.patchValue({
        precoMin: res.precoMin,
        precoMax: res.precoMax,
      })
    });
  }
  busca(ev: DadosBusca){
    this.passagensService.getPassagens(ev).subscribe(
      res => {
        console.log(res)
        this.passagens = res.resultado
      }
    )
  }
  limparFiltros() {
    this.buscaService.resetarFiltros();
    this.ngOnInit();
  }

}
