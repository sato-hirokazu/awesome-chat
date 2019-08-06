import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';


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
  ) {}

  ngOnInit() {
    
  }

  addAccount(){
    try {
      // await 
      let userProfile: User = this.usersService.getUserProfile();
      userProfile['sex'] = this.data['sex'];
      userProfile['birthday'] = this.data['birthday'];
      userProfile['tel'] = this.data['tel'];
      userProfile['message'] = this.data['message'];

      this.usersService.updateUser(userProfile);
    

    //   this.navCtrl.goRoot('room');

    } catch (error) {
    //   const alert = await this.alertController.create({
    //     header: '警告',
    //     message: error.message,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    }
  }
}
