import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data:{email:string, password:string } = { email: '', password: '' };
  constructor(
    public navCtrl:NavController,
    public alertController:AlertController,
    public authService:AuthService,
    public usersService:UsersService,
  ) { }

  ngOnInit() {
  }

  async signIn(){
    try{
      const user = await this.authService.signIn(this.data.email, this.data.password);
      const uid = user.user.uid;   
      await this.usersService.readUser(uid)
      .pipe(take(1))
      .subscribe(async (user)=>{
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
                this.navCtrl.navigateRoot('account/' + uid);
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
}
