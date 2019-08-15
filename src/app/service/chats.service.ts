import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from '../shared/chat';
import { Room } from '../shared/room';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  readChat(roomkey:string) {
    const messageRef = this.afs.collection('rooms').doc(roomkey)
              .collection('chats', ref => ref.orderBy('sendDate',"asc"))
              .valueChanges();
    return messageRef;
  }

  createChat(roomkey:string, chat) {
    let uid = this.afs.createId();
    chat.chatId = uid
    chat.sendDate = new Date().getTime();
    this.afs.collection('rooms').doc(roomkey).collection('chats').doc(uid).set(chat);
    const room: Room = {
      lastMessage: chat.message,
      updateDate: chat.sendDate,
    };
    this.afs.collection('rooms').doc(roomkey).update(room);
  }
}
