import { Component, OnInit } from '@angular/core';
import { PromocaoService } from 'src/app/core/services/promocao.service';
import { LeafletMapComponent } from 'src/app/shared/leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor( private servicoPromocao: PromocaoService ){

  }
  ngOnInit(): void {
    this.servicoPromocao.listar()
    .subscribe(
      resposta => {
        console.log(resposta)
      
      }
    )
  }
}
