import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Store} from "@ngrx/store";
import {LoadMe, UserActionTypes} from "../user.actions";
import {Observable} from "rxjs";
import {User} from "../core/User.interface";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<User> = this.store.select(state => state.user.profile);

  editName: boolean = true;
  newName: string;
  fname: string;
  lname: string;

  editMail: boolean = true;
  newMail: string;
  mail: string;

  editUsername: boolean = true;
  newUsername: string;
  username: string;
  
  editAge: boolean = true;
  newAge: number;
  age: number;
  ages: number[];

  editBiography: boolean = true;
  newBiography: string;
  biography: string;

  editGender: boolean = true;
  newGender: string;
  gender: string;
  genderList: string[] = [
    'male',
    'female',
  ];

  editPref: boolean = true;
  newPref: string;
  preferences: string;
  preferencesList: string[] = [
    'male',
    'female',
  ];

  newTag: string;
  editInterests: boolean = true;
  interests: string[];
  
  constructor(private user: UserService,
              private store: Store<any>) { }

  ngOnInit() {
    this.ages = Array(100).fill(0).map((x,i)=>i);
    this.store.dispatch(new LoadMe());
    // this.profile$.subscribe((val) => console.log(val));
  }

  setMe() {
    console.log(this.profile$);
    let user = {
      "biography": "I'm really really very cool!"
    };

    // this.user.setMe(user).subscribe((user: User) => this.info = user)
  }

  getFullName() {
    let fullName;
    this.profile$.subscribe(val => fullName = val.fname + " " + val.lname)
    return fullName;
  }
  
  saveName() {
    if (!this.editName) {
      this.newName = this.fname + " " + this.lname;
    }
    else {
      this.profile$.subscribe(val => {
        this.fname = this.fname || val.fname;
        this.lname = this.lname || val.lname
      })
    }
    this.editName = !this.editName;
  }
  
  saveMail() {
    if (!this.editMail) {
      this.newMail = this.mail;
    }
    else {
      this.profile$.subscribe(val => this.mail = this.newMail || val.email);
    } 
    this.editMail = !this.editMail;
  }
  
  saveUsername() {
    if (!this.editUsername) {
      this.newUsername = this.username;
    }
    else {
      this.profile$.subscribe(val => this.username = this.newUsername || val.username);
    } 
    this.editUsername = !this.editUsername;
  }
  
  saveAge() {
    if (!this.editAge) {
      this.newAge = this.age + 18;
    }
    else {
      this.profile$.subscribe(val => this.age = (this.newAge || val.age) - 18);
    } 
    this.editAge = !this.editAge;
  }

  saveBiography() {
    if (!this.editBiography) {
      this.newBiography = this.biography;
    }
    else {
      this.profile$.subscribe(val => this.biography = this.newBiography || val.biography);
    } 
    this.editBiography = !this.editBiography;
  }

  saveGender() {
    if (!this.editGender) {
      this.newGender = this.gender;
    }
    else {
      this.profile$.subscribe(val => this.gender = this.newGender || val.gender);
    } 
    this.editGender = !this.editGender;
  }

  savePref() {
    if (!this.editPref) {
      this.newPref = this.preferences;
    }
    else {
      this.profile$.subscribe(val => this.preferences = this.newPref || val.preferences);
    } 
    this.editPref = !this.editPref;
  }

  saveTag() {
    if(!this.interests) {
      this.interests = [];
    } 
    if (this.newTag && !this.interests.includes(this.newTag)) {
      this.interests.push(this.newTag);
    }
    this.newTag = "";
    this.editInterests = !this.editInterests;
  }

  sendData() {
    let data = {};
    this.profile$.subscribe((val) => Object.assign(data, val));
    console.log({
      "age": this.newAge || data['age'],
      "biography": this.biography || data['biography'],
      "gender": this.gender || data['gender'],
      "preferences": this.preferences || data['preferences'],
      "interests": this.interests,
    });
  }
}
