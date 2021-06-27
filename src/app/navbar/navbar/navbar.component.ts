import { Component, OnInit } from '@angular/core';

//okta
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //okta

  isAuthenticated = false;
  constructor(public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }

  removeUID(){
    localStorage.removeItem('user');
    console.log('removing user from local storage');
  }

  async getInfo(): Promise<void> {
    if(this.isAuthenticated) {
      const userinfo = await this.oktaAuth.getUser();
      console.log(userinfo.sub);
    }
    else {
      console.log("not authenticated");
    }
  }
}
