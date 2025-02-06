import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipSelectionChange } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "src/app/shared/modal/modal.component";
import { DadosBusca } from "../types/types";

@Injectable({
    providedIn: 'root',
})
export class FormBuscaService {
    formBusca: FormGroup;

    constructor(private dialog: MatDialog) {
        const somenteIda = new FormControl(false, [Validators.required])
        const dataVolta = new FormControl(null, [Validators.required])

        this.formBusca = new FormGroup({
            somenteIda,
            origin: new FormControl(null, [Validators.required]),
            destino: new FormControl(null, [Validators.required]),
            tipo: new FormControl("Executiva"),
            adultos: new FormControl(3),
            criancas: new FormControl(0),
            bebes: new FormControl(1),
            dataIda: new FormControl(null, [Validators.required]),
            dataVolta,
            conexoes: new FormControl(null),
            companhias: new FormControl(null),
            precoMin: new FormControl(null),
            precoMax : new FormControl(null)
        })
        somenteIda.valueChanges.subscribe(somenteIda => {
            if(somenteIda){
                dataVolta.disable();
                dataVolta.setValidators(null);
            }else{
                dataVolta.enable();
                dataVolta.setValidators([Validators.required])
            }
            dataVolta.updateValueAndValidity
        })
    }
    
    // Optionally, add methods for form validation, reset, or other operations
    resetForm(): void {
      this.formBusca.reset();
    }
  
    getFormValue(): any {
      return this.formBusca.value;
    }
    getDescricaoPassageiros():string{
        let descricao = ''
        const adultos = this.formBusca.get('adultos')?.value;
        if(adultos && adultos >0){
            descricao += `${adultos} adulto${adultos>1 ?'s':''}`;
        }
        const criancas = this.formBusca.get('criancas')?.value;
        if(criancas && criancas>0){
            descricao += `${descricao ? ', ': ''}${criancas} criança${criancas>1 ?'s':''}`;
        }
        const bebes = this.formBusca.get('bebes')?.value;
        if(bebes && bebes>0){
            descricao += `${descricao ? ', ': ''}${bebes} bebê${bebes>1 ?'s':''}`;

        }
        return descricao;
    }
    trocarOrigemDestino(): void {
        const origem = this.formBusca.get('origem')?.value;
        const destino = this.formBusca.get('destino')?.value;

        this.formBusca.patchValue({
            origem: destino,
            destino: origem
        });
    }
    obterControle<T>(nome:string): FormControl{
        const control = this.formBusca.get(nome);
        if(!control){
            throw new Error(`Form control ${nome} não existe.`);
        }
        return control as FormControl<T>;
    }

    obterDadosDeBusca():DadosBusca{
        const dataIdaControl = this.obterControle<Date>('dataIda').value;
        const dadosBusca: DadosBusca ={
            pagina:1,
            porPagina:50,
            somenteIda:this.obterControle<boolean>('somenteIda').value,
            origemId:this.obterControle<number>('origem').value.id,
            destinoId:this.obterControle<number>('destino').value,
            tipo:this.obterControle<string>('tipo').value,
            passageirosAdultos:this.obterControle<number>('passageirosAdultos').value,
            passageirosCriancas:this.obterControle<number>('passageirosCriancas').value,
            passageirosBebes:this.obterControle<number>('passageirosBebes').value,
            dataIda: dataIdaControl.value.toISOString(),

        }
        const dataVoltaControl = this.obterControle<Date>('dataVolta').value;
        if(dataVoltaControl.value){
            dadosBusca.dataVolta = dataVoltaControl.value.toISOString();
        }
        const conexoesControl = this.obterControle<number>('conexoes');
        if(conexoesControl.value){
            dadosBusca.conexoes = conexoesControl.value;
        }
        const companhiasControl = this.obterControle<number[]>('companhias');
        if(companhiasControl.value){
            dadosBusca.companhiasId = companhiasControl.value
        }
        const precoMinControl = this.obterControle<number[]>('precoMin');
        if(precoMinControl.value){
            dadosBusca.precoMin = precoMinControl.value
        }
        const precoMaxControl = this.obterControle<number[]>('precoMax');
        if(precoMaxControl.value){
            dadosBusca.precoMax = precoMaxControl.value
        }
        return dadosBusca;
    }
    alterarTipo(evento: MatChipSelectionChange, tipo: string){
        if(evento.selected){
            this.formBusca.patchValue({
                tipo,
            })
            console.log('Tipo de passage, alterado para:', tipo)
        }
    }
    openDialog() {
        this.dialog.open(ModalComponent, {
            width:'50%'
        })
    }
    get formEstaValido(){
        return this.formBusca.valid
    }
    resetarFiltros() {
        this.formBusca.patchValue({
          dataIda: new Date().toISOString(),
          pagina: 1,
          porPagina: 25,
          somenteIda: false,
          passageirosAdultos: 1,
          tipo: 'Executiva'
        })
      }
}
