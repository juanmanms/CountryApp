import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th {
        text-align: left;
        padding: 8px;
        background-color: #f2f2f2;
      }
      td {
        border-bottom: 1px solid #f2f2f2;
        padding: 8px;
      }
    `,
  ],
})
export class CountryTableComponent {
  @Input() countries: Country[] = [];
}
