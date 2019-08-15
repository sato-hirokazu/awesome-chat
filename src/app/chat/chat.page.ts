import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import { ChatService } from '../service/chats.service';
import { Chat } from '../shared/chat';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';
import { RoomsService } from '../service/rooms.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  roomkey: string;
  roomName: string;
  chatMessage: string;
  uid:string;
  usersMap:{[userId:string]: User} = {};

  chats = [];
  offStatus = false;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  chatLineScroll: any;

  constructor(
    public navCtrl: NavController, 
    public route: ActivatedRoute,
    public chatsService:ChatService,
    public authService:AuthService,
    public usersService:UsersService,
    public roomeService:RoomsService,
  ) {
    this.roomkey = this.route.snapshot.paramMap.get('key') as string;
    const user = this.authService.currentUser();
    this.uid = user.uid;
    this.displayChatMessage();
    console.log("constructor");
   }

  ngOnInit() {
    console.log("ngOnInit");
  }
  
  async displayChatMessage() {
    console.log("displayChatMessage");
    this.usersService.readAllUsersWithoutKey()
    .subscribe((users) =>{
      users.forEach((user)=> {
        this.usersMap[user.uid] = user
      })
    })

    await this.roomeService.readRoom(this.roomkey)
    .subscribe((room) =>{
      const otherId = room["userId"].filter((userId) => {
        return userId != this.uid;
      });
      this.roomName = this.usersMap[otherId].name
    });

    this.chatsService.readChat(this.roomkey)
    .subscribe((message)=>{   
      this.chats = [];
      message.forEach((msg) => {
        if(msg.userId !== this.uid){
          msg.isRead= true,
          this.chatsService.updateChat(this.roomkey, msg)
        }
        this.chats.push(msg);
      });
    },);
  }

  sendChatMessage() {
    console.log("sendChatMessage");
    this.sendMessage('message', this.chatMessage);
    this.chatMessage = "";
  }

  sendMessage(type: string, message: string) {
    console.log("sendMessage");
    const chat: Chat = {
      message: message,
      userId: this.uid,
      isRead: false,
    };
    this.chatsService.createChat(this.roomkey, chat);
  }
}
