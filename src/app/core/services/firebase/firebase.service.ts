// - Angular Imports
import { inject, Injectable } from '@angular/core';

// - Firebase Imports
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// - Model's Imports
import { docNumberMultiple } from 'src/app/shared/models/numberMultiple';

// - Environment's Imports
import { environment } from 'src/environments/environment.prod';

// - Service's Imports
import { ToastMessageService } from '../messageService/toast-message.service';

/**
 * service to interact with firebase.
 * this service provides methods to add new documents to the collection
 * defined in the path 'numberMultiple' and in case of error notifies
 * the user with a toast message.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //+============= SERVICES =============+\\
  private readonly ToastMessageService: ToastMessageService = inject(ToastMessageService)

  private db!: Firestore;
  private readonly path: string = 'numberMultiple';

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }

  /**
   * Adds a new number multiple document to Firestore.
   * and in case of error notifies the user
   *
   * @param {docNumberMultiple} data
   * @private
   * @returns {Promise<void>}
   */
  public async setNumberMultiple(data: docNumberMultiple): Promise<void> {
    try {
      await addDoc(collection(this.db, this.path), data);
    } catch (e) {
      this.ToastMessageService.showToast({ message: (e as Error).message, duration: 3000, color: 'danger' })
    }
  }
}
