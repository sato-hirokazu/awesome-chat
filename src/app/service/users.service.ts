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
    return this.afs.collection('users').doc<User>(uid).valueChanges();
  }

  readAllUsers() {
    return this.afs.collection('users', ref => ref.orderBy('name',"asc"))
    .valueChanges({idField: 'key'});
  }

  readAllUsersWithoutKey() {
    return this.afs.collection<User>('users', ref => ref.orderBy('name',"asc"))
    .valueChanges();
  }

  updateUser(user:User) {
    this.afs.collection('users').doc(user.uid).update(user);
  }

  deleteUser(uid:string) {
    this.afs.collection('users').doc(uid).delete();
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



