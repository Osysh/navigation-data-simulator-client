import { Component, Input, OnInit } from '@angular/core';
import { Params } from '../app.component';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input() params!: Params;

  constructor() { }

  ngOnInit(): void {
  }

}
