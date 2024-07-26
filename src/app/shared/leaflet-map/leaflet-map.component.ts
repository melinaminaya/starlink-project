import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';  // Example for Leaflet

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -15.7801, -47.9292 ],
      zoom: 12
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}