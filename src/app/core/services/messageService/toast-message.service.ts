// - Angular Imports
import { inject, Injectable } from '@angular/core';

// -Ionic's imports
import { ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  //+============= SERVICES =============+\\
  private readonly toastController: ToastController = inject(ToastController)

  constructor() { }

  /**
  * Display of toasts with options received.
  *
  * @param {ToastOptions} ToastOption - Options for the toast (message, duration, position, etc.).
  * @private
  * @returns {Promise<void>}
  */
  public async showToast(ToastOption: ToastOptions): Promise<void> {
    const toast = await this.toastController.create(ToastOption)
    toast.present();
  }
}
