import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// -Interface's imports
import { groupMultipleNumber } from 'src/app/shared/interfaces/global/groupMultipleNumber';
import { ErrorDetails } from 'src/app/shared/interfaces/components/form/errorDetail';
import { multipleNumber } from 'src/app/shared/interfaces/global/multipleNumber';

// -Model's imports
import { docNumberMultiple } from 'src/app/shared/models/numberMultiple';

// -Ionic's imports
import { IonContent, IonButton, IonIcon, IonItem, IonText, IonAccordionGroup, IonAccordion, IonLabel, IonModal, IonButtons, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { arrowForwardOutline, globe, helpCircleOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// -Component's imports
import { HeaderComponent } from "../../shared/components/header/header.component";
import { CardComponent } from "../../shared/components/panel/card/card.component";
import { InputComponent } from "../../shared/components/form/input/input.component";

// -Service's imports
import { ValidateFormService } from 'src/app/shared/services/form/validate-form.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';


/**
 * MultiplesNumberPage - Page is used to display the numbers multiplied by a given value.
 *
 * this page allows the user to enter a numerical value and generates its multiples (multiples of 3, 5 and 7)
 * and displays them by color depending on the multiples.
 * It also groups the multiples and displays them in an accordion.
 *
 * @component
 * @example
 * <app-multiples-number></app-multiples-number>
 */
@Component({
  selector: 'app-multiples-number',
  templateUrl: './multiples-number.page.html',
  styleUrls: ['./multiples-number.page.scss'],
  standalone: true,
  imports: [IonToolbar, IonTitle, IonButtons, IonModal, IonLabel, IonAccordion, IonAccordionGroup, IonText, IonItem, ReactiveFormsModule, IonIcon, IonButton, IonContent, CommonModule, FormsModule, HeaderComponent, CardComponent, InputComponent]
})
export class MultiplesNumberPage {
  //+=================== SERVICES ===================+\\
  private readonly ValidateFormService: ValidateFormService = inject(ValidateFormService)
  private readonly firebaseService: FirebaseService = inject(FirebaseService)
  private readonly formBuilder: FormBuilder = inject(FormBuilder)


  //+==================== FORMS =====================+\\
  public formNumberMultiple = this.formBuilder.nonNullable.group({
    numberMultiple: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
  })

  get numberMultiple() {
    return this.formNumberMultiple.controls.numberMultiple;
  }

  // +================ ERRORS DETAIL =================+\\
  private errorsForms: ErrorDetails = {
    title: 'input invalido',
    errors: {
      required: 'El campo numerico es obligatorio',
      pattern: 'El campo numerico no tiene un formato válido, debe ser un numero positivo mayor a 0'
    }
  }

  //+============== GLOBAL VARIABLES =================+\\
  public displayNumbers: multipleNumber[] = []
  public groupMultipleNumber: groupMultipleNumber[] = []
  public multipleNumbers: multipleNumber[] = [
    {
      value: 3,
      color: '#0bd18a'
    },
    {
      value: 5,
      color: '#fc6161',
    },
    {
      value: 7,
      color: '#2fbcfb'
    }
  ]


  //&====================== LIFE CYCLES ======================&\\
  /**
   * Initializes the component and registers required Ionicons.
   */
  constructor() {
    addIcons({ globe, helpCircleOutline, arrowForwardOutline, trashOutline });
  }

  //&=================== FUNTIONS FOR FORM ===================&\\
  /**
   * Clears the form and resets the display and grouping of multiple numbers.
   *
   * @public
   * @returns {void}
   */
  public clearFormAndMultiples(): void {
    this.resetForm();
    this.clearGroupAndDisplay();
  }

  /**
   * reset form numbermultiple
   *
   * @private
   * @returns {void}
   */
  private resetForm(): void {
    this.formNumberMultiple.reset();
  }

  /**
   * Resets the `displayNumbers` and `groupMultipleNumber` arrays to empty states.
   *
   * @private
   * @returns {void}
   */
  private clearGroupAndDisplay(): void {
    this.displayNumbers = [];
    this.groupMultipleNumber = [];
  }


  //&=================== GENERAL FUNCTIONS ===================&\\
  /**
   * Generates multiples based on the input number.
   *
   * If the form is valid, generates multiples and groups them.
   * If invalid, shows an error notification.
   *
   * @public
   * @returns {void}
   */
  public generateMultiples(): void {

    // verify if for is valid
    if (this.formNumberMultiple.invalid) {
      this.notificationErrorForm();
      return
    }

    // Destructure the form to obtain control
    const { numberMultiple } = this.formNumberMultiple.controls


    // Get the multiples with colors to be displayed and assign them
    this.displayNumbers = this.checkMultipleNumber(Number(numberMultiple.value))

    // Group to obtain the multiples and allocate them
    this.groupMultipleNumber = this.groupMultiple(this.displayNumbers)


    // Create document and call function to save document from numberMultiple
    const documentNumberMultiple: docNumberMultiple = { value: Number(numberMultiple.value), numberMultipleDisplay: this.displayNumbers, groupNumberMultiple: this.groupMultipleNumber }
    this.saveConsultFireBase(documentNumberMultiple)
  }

  /**
   * Notifies the user of form validation errors.
   * Uses the ValidateFormService to display a toast with the error message.
   *
   * @public
   * @returns {void}
   */
  public notificationErrorForm(): void {
    this.ValidateFormService.notifyErrorFormControl(this.formNumberMultiple.controls.numberMultiple, this.errorsForms)
  }

  /**
   * Checks if the number is a multiple of any of the stated multiples.
   * Creates an array from 0 to the specified number, then checks if
   * the number is a multiple of the set multiply and returns the array.
   *
   * @param {number} numberRange
   * @private
   * @returns {multipleNumber[]}
   */
  private checkMultipleNumber(numberRange: number): multipleNumber[] {
    const numberDisplay: number[] = Array.from({ length: numberRange + 1 }, (_, index) => index)
    return numberDisplay.map((item: number) => this.verifyMultiple(item))
  }

  /**
   * Verifies if a number is a multiple of the predefined values.
   *
   * @param {number} indexNumber
   * @private
   * @returns {multipleNumber}
   */
  private verifyMultiple(indexNumber: number): multipleNumber {
    const findMultiple: multipleNumber | undefined = this.multipleNumbers.find((item: multipleNumber) => indexNumber % item.value === 0 && indexNumber !== 0)
    return findMultiple === undefined ? { value: indexNumber, color: '#000000' } : { value: indexNumber, color: findMultiple.color }
  }

  /**
  * Groups numbers based on their multiples and assigns them to respective colors.
  *
  * @param {multipleNumber[]} displayNumbers
  * @private
  * @returns {groupMultipleNumber[]}
  */
  private groupMultiple(displayNumbers: multipleNumber[]): groupMultipleNumber[] {
    const groupMultiples: groupMultipleNumber[] = []

    for (const index of displayNumbers) {
      const findMultiples: multipleNumber[] = this.multipleNumbers.filter((item: multipleNumber) => index.value % item.value === 0 && index.value !== 0);

      if (findMultiples.length > 0) {
        for (const findMultiple of findMultiples) {
          const existingGroup = groupMultiples.find((item: groupMultipleNumber) => item.value === findMultiple.value);

          if (!existingGroup) {
            groupMultiples.push({ value: findMultiple.value, groupValue: [index.value] });
          } else {
            existingGroup.groupValue.push(index.value);
          }
        }
      }
    }

    return groupMultiples;
  }


  //&=================== FUNCTION FOR SAVE DOCUMENT ===================&\\
  /**
   * Saves a 'numberMultiple' document to Firestore using FirebaseService.
   *
   * @param {docNumberMultiple} documentNumberMultiple - Document data to be saved.
   * @private
   * @returns {void}
   */
  private saveConsultFireBase(documentNumberMultiple: docNumberMultiple): void {
    this.firebaseService.setNumberMultiple(documentNumberMultiple)
  }

}
