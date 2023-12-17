import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Params {
  "refreshInterval": number,
  "from": {
      "lat": number,
      "long": number,
      "time": string
  },
  "to": {
      "lat":  number,
      "long": number,
      "time": string
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'navigation-data-simulation-client';
  public params!: Params;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/params').subscribe({
      next: (response) => {
        this.params = response as Params;
      },
      error: (error) => {
        console.error('Error starting socket connection:', error);
      }
    });
  }
}
