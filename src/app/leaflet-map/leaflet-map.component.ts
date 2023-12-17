import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WebSocketService, PositionFromMessage } from '../websocket.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  private map!: L.Map;
  private messageSubscription!: Subscription;
  private markers: Record<string, L.Marker> = {};

  constructor(private websocketService: WebSocketService, private http: HttpClient) { }

  ngOnInit(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.messageSubscription = this.websocketService.messages$.subscribe({
      next: (message: PositionFromMessage) => {
        message.mobiles.forEach(mobile => {
          const { position, name } = mobile;

          if (!this.markers[name]) {
            // If marker doesn't exist, create and add it to the map
            this.markers[name] = L.marker(position).addTo(this.map);
          } else {
            // If marker already exists, just update its position
            this.markers[name].setLatLng(position);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.websocketService.connect('ws://localhost:3000');
  }

  public onStop() {
    this.websocketService.closeConnection();
  }

  public onLaunch() {
    this.http.get('http://localhost:3000/api/socket?status=1').subscribe({
      next: (response) => {
        console.log('Socket connection initiated:', response);
        this.websocketService.connect('ws://localhost:3000');
      },
      error: (error) => {
        console.error('Error starting socket connection:', error);
      }
    });
    this.websocketService.connect('ws://localhost:3000');
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.websocketService.closeConnection();
  }
}
