import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { map } from 'rxjs/operators';
import { 
  AngularFirestore,
  AngularFirestoreDocument, 
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userProfile: User;
  user: Observable<User>;
  users: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  readUser(uid:string) {
    return this.afs.collection('users').doc(uid).valueChanges()
  }

  updateUser(user:User) {
    return this.afs.collection('users').doc(user.uid).update(user);
  }


  setUserProfile(userProfile:User){
    this.userProfile = userProfile;
  }

  getUserProfile(){
    console.log(this.userProfile);
    if(this.userProfile){
      return this.userProfile;
    }
  }
}



