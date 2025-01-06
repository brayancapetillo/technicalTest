// -Core Angular imports
import { Component } from '@angular/core';

/**
 * CardComponent - A reusable card element for displaying content.
 *
 * @component
 * @example
 * <app-card></app-card>
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor() { }
}
