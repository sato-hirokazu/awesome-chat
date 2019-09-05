import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {
  users = [];
  me = [];
  currentUserId: string;

  constructor(
    public usersService: UsersService,
    public navCtrl: NavController,
    public authService: AuthService,
  ) {
    this.currentUserId = this.authService.currentUserId();
  }

  ngOnInit() {
    this.usersService.readAllUsers()
    .subscribe((val) => {
      this.me = [];
      this.users = [];
      val.forEach((user) => {
        if (this.currentUserId === user.uid) {
          this.me.push(user);
        } else {
          this.users.push(user);
        }
      });
    }, );
  }

  showUser(key) {
    this.navCtrl.navigateRoot('account/' + key);
  }
}
