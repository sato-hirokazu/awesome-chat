import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import {  FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../shared/room';
import { RoomsService } from '../service/rooms.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  // value:any;
  initData:User;
  validations_form: FormGroup;
  userId: string;
  isRead: boolean;
  isType:string;
  currentUserId:string;
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
    public authService:AuthService,
    public formBuilder: FormBuilder,
    public alertController:AlertController,
    public route: ActivatedRoute,
    public roomsService:RoomsService,
  ) {
    this.userId = this.route.snapshot.paramMap.get('key') as string;
    this.currentUserId = this.authService.currentUserId();
  }

  ngOnInit() {
    this.usersService.readUser(this.userId)
    .subscribe((val)=>{
      if(this.currentUserId === val.uid && val.name === ""){
        this.isType = "addName";
        this.isRead = false;
      }
      if(this.currentUserId === val.uid && val.name !== ""){
        this.isType = "showMe";
        this.isRead = true;
      }
      if(this.currentUserId !== val.uid){
        this.isType = "showOther"
        this.isRead = true;
      }

      this.initData = val;
      this.buldForm(this.initData);
    });
  };

  async addAccount(){

    try {      
      if(!this.validations_form.value.name){
        return this.navCtrl.navigateForward('account');
      }
      this.validations_form.value.uid = this.currentUserId;
      this.usersService.updateUser(this.validations_form.value);
      this.isType = "showMe"
      this.isRead = true ;

    } catch (error) {
      const alert = await this.alertController.create({
        header: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  editAccount(){
    this.isType = "addName"
    this.isRead = false ;
  }

  async cancel(){
      const alert = await this.alertController.create({
        header: '警告',
        message: "入力中の情報は破棄されますがよろしいですか？",
        buttons: [
          {
            text: 'はい',
            handler: () => {
              this.buldForm(this.initData);
              this.isType = "showMe"
              this.isRead = true;
            }
          }, {
            text: 'キャンセル',
          }
        ]
      });
      alert.present();
  };

  async deleteAccount(){
    const alert = await this.alertController.create({
      header: '警告',
      message: "削除しますがよろしいですか？",
      buttons: [
        {
          text: 'はい',
          handler: () => {
            this.usersService.deleteUser(this.currentUserId);
            this.navCtrl.navigateRoot('account-list');
          }
        }, {
          text: 'キャンセル',
        }
      ]
    });
    alert.present();
  };

  buldForm(data){
    this.validations_form = this.formBuilder.group({     
      birthday: new FormControl(data.birthday, Validators.required),
      email: new FormControl(data.email, Validators.required),
      image: new FormControl(data.image),
      message: new FormControl(data.message, Validators.maxLength(15)),
      name: new FormControl(data.name, Validators.required),
      sex: new FormControl(data.sex, Validators.required),
      tel: new FormControl(data.tel, [Validators.required, Validators.pattern("[0-9]*")])
    });
  }

  addRoom(){
    const room: Room = {
      userId:[      
        this.currentUserId,//自分
        this.initData.uid,//相手
       ] 
    };
    this.roomsService.createRoom(room);
    this.navCtrl.navigateRoot('chat/' + room.roomId);
  }
}
