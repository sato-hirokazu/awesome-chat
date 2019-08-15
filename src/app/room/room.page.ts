import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { RoomsService } from '../service/rooms.service';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  usersMap:{[userId:string]: User} = {};
  currentUserId:string;

  rooms = [];
  constructor(
    public navControl:NavController,
    public authService:AuthService,
    public roomsService:RoomsService,
    public usersService:UsersService,
    ) {
      this.currentUserId = this.authService.currentUserId();
    }

  ngOnInit() {
    this.usersMap = this.usersService.readAllUsersMap()
    this.roomsService.readAllRooms()
    .subscribe((rooms)=>{
      rooms.forEach((room) => {
        if(room["userId"].includes(this.currentUserId)){
          // 相手ユーザ
          const otherId = room["userId"].filter((userId) => {
            return userId !== this.currentUserId;
          });
          room["roomName"] = this.usersMap[otherId].name
          this.rooms.push(room);
        }
      });
    },);
  }

  joinRoom(key) {
    this.navControl.navigateRoot('chat/' + key);
  }

}
