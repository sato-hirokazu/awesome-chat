import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import { ChatService } from '../service/chats.service';

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

    this.chats = [];
    this.chatsService.readChat(this.roomkey)
    .subscribe((message)=>{   
      message.forEach((msg) => {
        this.chats.push(msg);
      });
    },);
  
      //   if (resp) {
      //     this.chats = [];
      //     resp.forEach(childSnapshot => {
      //       const chat = childSnapshot.val();
      //       chat.key = childSnapshot.key;
      //       this.chats.push(chat);
      //     });
      //     setTimeout(async () => {
      //       if (this.offStatus === false) {
      //         // FIX-ME
      //         // V4でコンテンツエリアをスクロールする方法が分からない
      //         const el = await this.content.getScrollElement();
      //         el.scrollToBottom(300);
      //       }
      //     });
      //   }
      // });
  }

  // sendJoinMessage() {
  //   this.sendMessage('join', this.nickname + ' has joined this room.');
  // }

  // sendMessage(type: string, message: string) {
  //   const newData = firebase.database().ref('rooms/' + this.roomkey + '/chats').push();
  //   // newData.set({
  //   //   type: type,
  //   //   user: this.nickname,
  //   //   message: message,
  //   //   sendDate: Date()
  //   // });
  // }

}
