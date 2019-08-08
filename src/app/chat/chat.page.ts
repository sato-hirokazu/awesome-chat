import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import { ChatService } from '../service/chats.service';
import { Chat } from '../shared/chat';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  roomkey: string;
  nickname: string;
  chatMessage: string;

  chats = [];
  offStatus = false;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  chatLineScroll: any;

  constructor(
    public navCtrl: NavController, 
    public route: ActivatedRoute,
    public chatsService:ChatService,
  ) {
    this.roomkey = this.route.snapshot.paramMap.get('key') as string;
    // とりあえず下手書き
    this.nickname = "sakiko";
    // this.sendJoinMessage();
    this.displayChatMessage();
   }

  ngOnInit() {
  }
  
  displayChatMessage() {

    console.log("msg");
    this.chats = [];
    this.chatsService.readChat(this.roomkey)
    .subscribe((message)=>{   
      message.forEach((msg) => {
        console.log(msg);
        this.chats.push(msg);
      });
    },);
  }

  sendChatMessage() {
    this.sendMessage('message', this.chatMessage);
    this.chatMessage = "";
  }

  sendMessage(type: string, message: string) {

    const chat: Chat = {
      message: message,
      user: this.nickname,
      sendDate:new Date()
    };
    this.chatsService.createChat(this.roomkey, chat);
  }

  // sendJoinMessage() {
  //   this.sendMessage('join', this.nickname + ' has joined this room.');
  // }
}
