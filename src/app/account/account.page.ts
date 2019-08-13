import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { User } from '../shared/user';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {  FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  value:any;
  data:User;
  validations_form: FormGroup;
  userkey: string;
  isRead: boolean;
  isType:string;
  
  constructor(
    public usersService:UsersService,
    public navCtrl:NavController,
    public authService:AuthService,
    public formBuilder: FormBuilder,
    public alertController:AlertController,
    public route: ActivatedRoute,
  ) {
    this.userkey = this.route.snapshot.paramMap.get('key') as string;
  }

  ngOnInit() {
    this.usersService.readUser(this.userkey)
    .subscribe((val)=>{

      const user = this.authService.currentUser();
      if(user.uid === val['uid'] && val['name'] === ""){
        this.isType = "addName";
        this.isRead = false;
      }
      if(user.uid === val['uid'] && val['name'] !== ""){
        this.isType = "showMe";
        this.isRead = true;
      }
      if(user.uid !== val['uid']){
        this.isType = "showOther"
        this.isRead = true;
      }

      console.log(this.isType);
      this.data = val;
      this.buldForm(this.data);
      // this.validations_form = this.formBuilder.group({     
      //   birthday: new FormControl(this.data.birthday, Validators.required),
      //   email: new FormControl(this.data.email, Validators.required),
      //   image: new FormControl(this.data.image),
      //   message: new FormControl(this.data.message, Validators.maxLength(15)),
      //   name: new FormControl(this.data.name, Validators.required),
      //   sex: new FormControl(this.data.sex, Validators.required),
      //   tel: new FormControl(this.data.tel, [Validators.required, Validators.pattern("[0-9]*")])
      // });
    });
  };

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
            this.buldForm(this.data);
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
