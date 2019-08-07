import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { RoomsService } from '../service/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  rooms = [];
  constructor(
    public navControl:NavController,
    public authService:AuthService,
    public roomsService:RoomsService,
    ) {}

  ngOnInit() {
    this.roomsService.readAllRooms().subscribe((rooms)=>{
      rooms.forEach((room) => {
        this.rooms.push(room);
      });
    },);
  }

  async signOut(){
    try{
      await this.authService.signOut();
      this.navControl.navigateRoot('signin');

    } catch (error) {
    }
  }

}
