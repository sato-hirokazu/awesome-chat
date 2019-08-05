import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  constructor(public navControl:NavController,
    public authService:AuthService) { }

  ngOnInit() {
    // firebase.auth().onAuthStateChanged()
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
