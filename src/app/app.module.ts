import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { HttpClientModule } from '@angular/common/http';
import { BoxComponent } from './box/box.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
