import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { User } from '../shared/users';
// import { User } from 'firebase';

// import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data:{email:string, password:string } = { email: '', password: '' };
  lUser: User;

  constructor(
    public navCtrl:NavController,
    public alertController:AlertController,
    public authService:AuthService,
    public usersService:UsersService,
  ) { 
  }

  async signIn(){
    try{
      const user = await this.authService.signIn(this.data.email, this.data.password);
      const uid = user.user.uid;
      this.usersService.readUser(uid).subscribe((user:User)=>{
        if (user && user.name) {
          this.navCtrl.navigateRoot('room');
        } else {
          this.navCtrl.navigateRoot('account');
        }
      },);
      
      this.navCtrl.navigateRoot('signin');
      // this.navCtrl.navigateRoot('room');

    } catch (error) {
      const alert = await this.alertController.create({
        header: '警告',
        // message: error.message,
        message: "初回ログインのため、アカウント画面に遷移します",
        // buttons: ['OK']
        buttons:[{
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateRoot('account');
          }
        }]
      });
      alert.present();
      // this.navCtrl.navigateRoot('account');
    }
  }
  signUp() {
  }

  ngOnInit() {
  }

}
