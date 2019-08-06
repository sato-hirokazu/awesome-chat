import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  data:{sex:string, birthday:string, tel:string, message:string } = { sex: '', birthday: '',tel: '',message: '' };
  constructor() { }

  ngOnInit() {
    
  }
}
