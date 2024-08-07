import { Component, Input, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UnidadeFederativaService } from '../../../core/services/unidade-federativa.service';
import { UnidadeFederativa } from '../../../core/types/unidadefederativa';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dropdown-uf',

  templateUrl: './dropdown-uf.component.html',
  styleUrl: './dropdown-uf.component.scss'
})
export class DropdownUfComponent implements OnInit {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  unidadesFederativa: UnidadeFederativa[] = [];
  filteredOptions$!: Observable<UnidadeFederativa[]>;


  constructor(private unidadeFederativaService: UnidadeFederativaService) { }

  ngOnInit(): void {
    this.unidadeFederativaService.Listar().subscribe({
      next: (data) => {
        console.log('Received estados in component:', data);
        this.unidadesFederativa = data;
        this.filteredOptions$ = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filterEstados(value || ''))
        );
      },
      error: (error) => {
        console.error('Error fetching estados:', error);
      },
      complete: () => {
        console.log('Fetch estados complete');
      }
    });
  }
  private filterEstados(value: string |UnidadeFederativa): UnidadeFederativa[] {
    const nomeUf = typeof value === 'string' ? value : value?.nome
    const filterValue = nomeUf.toLowerCase();
    return this.unidadesFederativa.filter(option => 
      option.nome.toLowerCase().includes(filterValue) ||
      option.sigla.toLowerCase().includes(filterValue)
    );
  }
  displayFn(estado:UnidadeFederativa):string{
    return estado && estado.nome ? estado.nome :'';
  }
}