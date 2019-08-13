import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {
  users = [];
  me = [];
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
    public authService:AuthService,
  ) { }

  ngOnInit() {
    const user = this.authService.currentUser();
    const uid = user.uid;

    this.usersService.readAllUsers()
    .subscribe((val)=>{
      val.forEach((user) => {
        if(uid === user["uid"]){
          this.me.push(user);
        }else{
          this.users.push(user);
        }
      });
    },);
  }

  showUser(key){
    this.navCtrl.navigateRoot('account/' + key);
  }
}
