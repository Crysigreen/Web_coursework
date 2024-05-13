import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})
export class StockChartComponent implements OnInit {
  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [90, 92, 95, 103, 99, 97, 104, 109, 107, 103, 105, 101],
        label: 'Цена акции',
        borderColor: 'black', // Черный цвет линии
        borderWidth: 2,
        fill: false, // Без заливки
      }
    ],
    labels: ['фев.', '14', 'март', '15', 'апр.', '12', 'май']
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, // Начинать с минимального значения в данных
        grid: {

          color: (context) => {
            if (context.tick.value === 100.86) {
              return '#cccccc'; // Цвет горизонтальной пунктирной линии
            }
            return 'rgba(0,0,0,0.1)'; // Цвет других линий сетки
          },

        }
      },
      x: {
        grid: {
          display: false // Убрать вертикальные линии сетки
        }
      }
    },
    plugins: {
      legend: {
        display: false // Убрать легенду
      },
      tooltip: {
        enabled: true, // Включить тултипы
      }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor() { }

  ngOnInit(): void {
  }
}
