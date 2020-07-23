import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroesService} from '../heroes.service';
import {environment} from '../../environments/environment.prod';
import * as   Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  mapa: Mapboxgl.Map;
  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-75.7611979, 45.3516034], // LNG, LAT
      zoom: 16.6
    });
    this.createMarker(-75.7611979, 45.3516034);


  }

  createMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }


}
