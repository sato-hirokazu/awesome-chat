import { Injectable } from '@angular/core';
import { User } from '../shared/users';
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

  user: Observable<User>;
  users: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  readUser(uid:string) {
    return this.afs.collection('users').doc(uid).valueChanges()
  }
}


