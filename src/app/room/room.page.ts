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

  rooms = [];
  constructor(
    public navControl:NavController,
    public authService:AuthService,
    public roomsService:RoomsService,
    public usersService:UsersService,
    ) {}

  ngOnInit() {
    this.usersService.readAllUsersWithoutKey()
    .subscribe((users) =>{
      users.forEach((user)=> {
        this.usersMap[user.uid] = user
      })
    })

    this.roomsService.readAllRooms()
    .subscribe((rooms)=>{
      rooms.forEach((room) => {
        const user = this.authService.currentUser();
        if(room["userId"].includes(user.uid)){
          const otherId = room["userId"].filter((userId) => {
            return userId != user.uid;
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
