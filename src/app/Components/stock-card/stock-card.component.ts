import { Component, Input } from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css'
})
export class StockCardComponent {
  @Input() stock: any;
}
