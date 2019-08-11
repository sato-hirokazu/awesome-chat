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

  constructor(
    private afs: AngularFirestore,
  ) { }

  readUser(uid:string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  readAllser() {
    return this.afs.collection('users').valueChanges({idField: 'key'})
  }

  updateUser(user:User) {
    this.afs.collection('users').doc(user.uid).update(user);
  }

  setUserProfile(userProfile:User){
    this.userProfile = userProfile;
  }

  getUserProfile(){
    if(this.userProfile){
      return this.userProfile;
    }
  }
  
}



