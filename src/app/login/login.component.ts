import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  template: `
    <div id="okta-signin-container"></div>`,
  styles: []
})
export class LoginComponent implements OnInit {
  widget = new OktaSignIn({
    baseUrl: 'https://dev-12254617.okta.com',
    clientId: '0oa1073l82zcpeQp25d7',
    redirectUri: 'http://localhost:4200/callback'
  });

  constructor(private oktaAuth: OktaAuthService, router: Router) {
    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
          case '':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.widget.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(async (tokens: Tokens | undefined) => {
      const originalUri = this.oktaAuth.getOriginalUri();
      if (originalUri === DEFAULT_ORIGINAL_URI) {
        this.oktaAuth.setOriginalUri('/');
      }

      // Remove the widget
      this.widget.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      await this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }
}
