import { Component, Input } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [MatCardModule,CommonModule, RouterModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css'
})
export class StockCardComponent {
  @Input() stock: any;
}
