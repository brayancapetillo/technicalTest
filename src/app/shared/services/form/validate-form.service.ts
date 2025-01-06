// - Angular Imports
import { inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

// - Interface's Imports
import { ErrorDetails } from '../../interfaces/components/form/errorDetail';

// - Service's Imports
import { ToastMessageService } from 'src/app/core/services/messageService/toast-message.service';

/**
 * Service for validating form inputs and displaying error notifications.
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateFormService {
  //+============= SERVICES =============+\\
  private readonly ToastMessageService: ToastMessageService = inject(ToastMessageService)

  constructor() { }

  /**
   * Check type of error and displays a toast with an error message .
   *
   * @param {FormControl} control.
   * @param {ErrorDetails} errors.
   * @public
   * @returns {void}
   */
  public notifyErrorFormControl(control: FormControl, errors: ErrorDetails): void {
    if (control.errors) {
      Object.keys(control.errors).some((key: string) => {
        if (errors.errors[key]) {
          const errorDetail: ErrorDetails = errors;
          this.ToastMessageService.showToast({ message: errorDetail.errors[key], duration: 3000, position: 'bottom', color: 'primary' })
        }
      })
    }
  }

}
