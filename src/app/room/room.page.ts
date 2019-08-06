import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {


  rooms = [];
  constructor(public navControl:NavController,
    public authService:AuthService) { }

  ngOnInit() {
    this.authService.onAuthStateChanged((user) =>{
      if (user) {
      //   authService.database().ref('chatrooms/').on('value', resp => {
      //     if (resp) {
      //       this.rooms = [];
      //       resp.forEach(childSnapshot => {
      //         const room = childSnapshot.val();
      //         room.key = childSnapshot.key;
      //         this.rooms.push(room);
      //       });
      //     }
      //   });
      // } else {
      //   this.navCtrl.goRoot('signin');
      // }
    }});
  }

  async signOut(){
    try{
      await this.authService.signOut();
      this.navControl.navigateRoot('signin');

    } catch (error) {
      // const alert = await this.alertController.create({
      //   header: '警告',
      //   message: error.message,
      //   buttons: ['OK']
      // });
      // alert.present();
    }
  }

}
