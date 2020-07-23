import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroesService} from '../heroes.service';
import {environment} from '../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';

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

    const start = [-74.5, 40];
    const end = [74.5, 40];
    let isAtStart = true;

    document.getElementById('fly').addEventListener('click', () => {
      // depending on whether we're currently at point a or b, aim for
      // point a or b
      const target = isAtStart ? end : start;

      // and now we're at the opposite point
      isAtStart = !isAtStart;
      const marker = this.createMarker(74.5, 40);
      this.mapa.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: target,
        zoom: 9,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: (t) => {
          return t;
        },

        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true
      });
    });
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
