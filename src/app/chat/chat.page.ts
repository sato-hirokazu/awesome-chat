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
  usersMap:{[userId:string]: User} = {};
  currentUserId:string;

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
    this.currentUserId = this.authService.currentUserId();
    this.displayChatMessage();
   }

  ngOnInit() {
  }
  
  async displayChatMessage() {
    await this.usersService.readAllUsersWithoutKey()
    .subscribe((users) =>{
      users.forEach((user)=> {
        this.usersMap[user.uid] = user
      })
    })

    await this.roomeService.readRoom(this.roomkey)
    .subscribe((room) =>{
      const otherId = room["userId"].filter((userId) => {
        return userId != this.currentUserId;
      });
      this.roomName = this.usersMap[otherId].name
    });

    this.chatsService.readChat(this.roomkey)
    .subscribe((message)=>{   
      this.chats = [];
      message.forEach((msg) => {
        if(msg.userId !== this.currentUserId){
          msg.isRead= true,
          this.chatsService.updateChat(this.roomkey, msg)
        }
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
      userId: this.currentUserId,
      isRead: false,
    };
    this.chatsService.createChat(this.roomkey, chat);
  }
}
