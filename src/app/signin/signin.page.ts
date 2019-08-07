import { Component, OnInit, Inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data:{email:string, password:string } = { email: '', password: '' };
  constructor(
    // @Inject(NavParams)
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
      
      this.usersService.readUser(uid)
      .subscribe(async (user:User)=>{
        if (user && user.name) {
          this.navCtrl.navigateRoot('room');
        } else {
          this.usersService.setUserProfile(user);
          const alert = await this.alertController.create({
            header: '警告',
            message: "初回ログインのため、アカウント画面に遷移します",
            buttons:[{
              text: 'OK',
              handler: () => {
                this.navCtrl.navigateRoot('account');
              }
            }]
          });
          alert.present();
        }
      },);
    } catch (error) {
      const alert = await this.alertController.create({
        header: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }
  signUp() {
  }

  ngOnInit() {
    
  }

}
