// -Core Angular imports
import { Component, Input, OnInit } from '@angular/core';

// -Ionic's imports
import { menuOutline, sunnyOutline } from 'ionicons/icons';
import { IonicModule } from "@ionic/angular"
import { addIcons } from 'ionicons';

/**
 * HeaderComponent - A reusable header component with customizable title (disabled) and change mode.
 * This standalone component uses Ionic components and icons for enhanced functionality.
 *
 * @component
 * @example
 * <app-header [title]="titleHeader"></app-header>
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //+============== INPUTS ===============+\\
  @Input({ required: true }) title!: string;

  //+========= GLOBAL VARIABLES ==========+\\
  private paletteToggle = false;

  //&====================== LIFE CYCLES ======================&\\

  /**
   * Initializes the component and registers the required Ionicons for the menu and sunny icons.
   * @constructor
   */
  constructor() {
    addIcons({ sunnyOutline, menuOutline });
  }

  /**
   * Lifecycle hook that initializes the dark mode palette based on the user's system preferences.
   * Listens for changes in the color scheme preference and updates the theme accordingly.
   * @public
   * @returns {void}
   */
  public ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  //&=============== FUNCTIONS FOR CHANGE THEME ==============&\\
  /**
   * Initializes the dark palette based on the provided dark mode preference.
   * @param {boolean} isDark
   * @public
   * @returns {void}
   */
  private initializeDarkPalette(isDark: boolean): void {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  /**
   * Toggles the dark palette on or off and updates the class on the body element.
   *
   * @public
   * @returns {void}
   */
  public toggleChange(): void {
    this.paletteToggle = !this.paletteToggle;
    this.toggleDarkPalette(this.paletteToggle);
  }

  /**
   * Applies or removes the dark palette class on the body element based on the provided flag.
   *
   * @param {boolean} shouldAdd
   * @public
   * @returns {void}
   */
  public toggleDarkPalette(shouldAdd: boolean): void {
    document.body.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
