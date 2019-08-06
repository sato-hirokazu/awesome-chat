import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';
import { NavController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  value:any;
  data:User = this.usersService.getUserProfile();
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
    public authService:AuthService,
  ) {}

  ngOnInit() {
    
  }

  addAccount(){
    try {
      // await 
      let userProfile: User = this.usersService.getUserProfile();
      if(!this.data.name){
        return this.navCtrl.navigateForward('account');
      }

      this.usersService.updateUser(userProfile);
      this.navCtrl.navigateRoot('room');
    } catch (error) {
      // なにかしらの処理
    }
  }


  async signOut(){
    try{
      await this.authService.signOut();
      this.navCtrl.navigateRoot('signin');

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
