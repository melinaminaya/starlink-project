import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Input() range: FormGroup = new FormGroup({
    start: new FormControl(null, [Validators.required]),
    end: new FormControl(null, [Validators.required])
  });
  readonly dialog = inject(MatDialog);
  @Output() realizarBusca = new EventEmitter();
  constructor(public formBuscaService: FormBuscaService) {

  }
  buscar() {
   if(this.formBuscaService.formEstaValido){
    const formBuscavalue = this.formBuscaService.obterDadosDeBusca();
    this.realizarBusca.emit(formBuscavalue);
   }else{
    alert('O formulario precisa ser preenchido.')
   }
  }

  openDialog() {
    this.dialog.open(ModalComponent)
  }

}
