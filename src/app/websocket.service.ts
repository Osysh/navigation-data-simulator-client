import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface PositionFromMessage {
  date: string;
  mobiles: Array<{
    position: [number, number];
    name: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<PositionFromMessage>();

  public messages$ = this.messageSubject.asObservable();

  constructor() { }

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = (event) => {
      console.log('Connection opened:', event);
    };

    this.socket.onmessage = (event) => {
      const data: PositionFromMessage = JSON.parse(event.data);
      this.messageSubject.next(data); // Emit the new data
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = (event) => {
      console.log('Connection closed:', event);
    };
  }

  public closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
