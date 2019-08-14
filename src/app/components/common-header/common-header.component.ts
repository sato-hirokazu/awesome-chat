import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NavController } from '@ionic/angular';
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
  roomList(){
    this.navControl.navigateRoot('room');
  }

  navigateForward(){
    this.location.back();
  }
}
