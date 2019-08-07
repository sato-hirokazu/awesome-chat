import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(
    private afs: AngularFirestore,
  ) {}
  
  readAllRooms() {
    return this.afs.collection('rooms').valueChanges()
  }
}
