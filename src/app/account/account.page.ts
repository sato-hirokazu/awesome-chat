import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {  FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  value:any;
  data:User;
  validations_form: FormGroup;
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
    public authService:AuthService,
    public formBuilder: FormBuilder,
    public alertController:AlertController,
  ) {}

  ngOnInit() {
    this.data = this.usersService.getUserProfile();
    this.validations_form = this.formBuilder.group({     
      birthday: new FormControl(this.data.birthday, Validators.required),
      email: new FormControl(this.data.email, Validators.required),
      image: new FormControl(this.data.image),
      message: new FormControl(this.data.message, Validators.maxLength(15)),
      name: new FormControl(this.data.name, Validators.required),
      sex: new FormControl(this.data.sex, Validators.required),
      tel: new FormControl(this.data.tel, [Validators.required, Validators.pattern("[0-9]*")])
    });
  }

  async addAccount(){
    
    const user = this.authService.currentUser();
    const uid = user.uid;

    try {      
      // await 
      if(!this.validations_form.value.name){
        return this.navCtrl.navigateForward('account');
      }
      this.validations_form.value['uid'] = uid;
      this.usersService.updateUser(this.validations_form.value);
      this.navCtrl.navigateRoot('room');
    } catch (error) {
      const alert = await this.alertController.create({
        header: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  async signOut(){
    try{
      await this.authService.signOut();
      this.navCtrl.navigateRoot('signin');

    } catch (error) {
      // const alert = await this.alertController.create({
      //   header: '警告',
      //   message: error.message,
      //   buttons: ['OK']
      // });
      // alert.present();
    }
  }
}
