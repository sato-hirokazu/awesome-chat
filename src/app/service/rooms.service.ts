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
    return this.afs.collection('rooms', ref => ref.orderBy('updateDate',"desc"))
    .valueChanges({idField: 'key'})
  }

  readRoom(roomId:string) {
    return this.afs.collection('rooms').doc(roomId).valueChanges();
  }

  createRoom(room) {
    let uid = this.afs.createId();
    room.roomId = uid;  
    room.updateDate = new Date().getTime();
    this.afs.collection('rooms').doc(uid).set(room);
  }
}
