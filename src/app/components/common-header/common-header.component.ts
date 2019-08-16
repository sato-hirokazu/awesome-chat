import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  @Input() title: string;
  constructor(
    public navControl:NavController,
    public authService:AuthService,
    private location: Location,
    public menuCtrl: MenuController
  ) {this.menuCtrl.close(); }

  ngOnInit() {
    this.menuCtrl.close();
  }

  async signOut(){
    try{
      await this.authService.signOut();
      this.navControl.navigateRoot('signin');
    } catch (error) {
    }
  }
  async accountList(){
    await this.menuCtrl.close();
    this.navControl.navigateRoot('account-list');
  }
  async roomList(){
    await this.menuCtrl.close();
    this.navControl.navigateRoot('room');   
  }

  navigateForward(){
    this.location.back();
  }
}
