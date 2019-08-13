import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {
  users = [];
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
  ) { }

  ngOnInit() {
    this.usersService.readAllUsers()
    .subscribe((val)=>{
      val.forEach((user) => {
        this.users.push(user);
        console.log(user);
      });
    },);
  }

  showUser(key){
    this.navCtrl.navigateRoot('account/' + key);
  }
}
