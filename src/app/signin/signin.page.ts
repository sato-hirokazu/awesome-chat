import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { take } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http'

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
    public http:HttpClient,
  ) { 
    let api  = 
    'https://auth.login.yahoo.co.jp/yconnect/v2/authorization?'
    + 'response_type=code'
    + '&client_id=dj00aiZpPVFIUnNRb0IxeE01ZiZzPWNvbnN1bWVyc2VjcmV0Jng9Yzc-'
    + '&redirect_uri=http://localhost:8100/signin'
    + '&scope=openid%20profile'
    + '&nonce=n-0S6_WzA2Mj';
    + '&prompt=consent';
    console.log(api);
    const res: any = this.http.get(api, {
      headers:{
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers' : 'content-type',
        // 'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',    
      }	
    }).subscribe(data => {
    });
  }

  ngOnInit() {
  }

  async signIn(){
    try{
      const user = await this.authService.signIn(this.data.email, this.data.password);
      const myId = user.user.uid;   
      await this.usersService.readUser(myId)
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
                this.navCtrl.navigateRoot('account/' + myId);
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
