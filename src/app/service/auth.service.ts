import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, 
    private navCtrl: NavController) {
  }
  signIn(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  
  signOut(){
    return this.afAuth.auth.signOut();
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }
  currentUserId() {
    return this.afAuth.auth.currentUser.uid;
  }
}

