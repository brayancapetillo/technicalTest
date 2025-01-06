// -Core Angular imports
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

// -Ionic's imports
import { IonItem, IonInput } from "@ionic/angular/standalone"

/**
 * InputComponent - reusable component for form inputs with validations.
 * This component uses reactive forms and is configurable for different types of input (text, numeric, etc.).
 *
 * @component
 * @example
 * <app-input [control]="formControl" [type]="'text'" [placeHolder]="'Enter text'"></app-input>
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [IonItem, IonInput, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  //+============== INPUTS ===============+\
  @Input({ required: true }) control!: FormControl
  @Input({ required: true }) type!: HTMLInputElement['type']
  @Input({ required: true }) placeHolder!: string

  constructor() { }
}
