import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { ProfileService } from '../login/services/profile.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private auth: AuthService, private profileService: ProfileService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log(val);
    });

  }




}
