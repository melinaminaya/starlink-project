import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

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

  openDialog() {
    this.dialog.open(ModalComponent)
  }

}
