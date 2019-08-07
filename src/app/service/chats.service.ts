import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from '../shared/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  readChat(roomkey:string) {
    const messageRef = this.afs.collection('rooms').doc(roomkey)
              .collection('chats').valueChanges({idField: 'key'});
    return messageRef;
  }
}
