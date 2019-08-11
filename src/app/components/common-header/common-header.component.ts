import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  constructor(
    public navControl:NavController,
    public authService:AuthService,
  ) { }

  ngOnInit() {}

  async signOut(){
    try{
      await this.authService.signOut();
      this.navControl.navigateRoot('signin');
    } catch (error) {
    }
  }
  accountList(){
    this.navControl.navigateRoot('account-list');
  }
}
