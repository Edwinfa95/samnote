import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, translations } from '@aws-amplify/ui-angular';
import { I18n, parseAmplifyConfig } from 'aws-amplify/utils';

import outputs from '../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';
const amplifyConfig = parseAmplifyConfig(outputs);
I18n.putVocabularies(translations);
I18n.setLanguage('es');
Amplify.configure({
  ...amplifyConfig,
  API: {
    ...amplifyConfig.API,
    REST: outputs.custom.API,
  },
});

const client = generateClient<Schema>();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    AmplifyAuthenticatorModule,
    RouterModule
  ],
})
export class AppComponent {
  title = 'samnote';

  constructor(
    private _router:Router,
    private _user: UserService,
    private _data:DataService
  ){
    this.validData();
  }

  async validData(){
    let basicData = localStorage.getItem('duii');
    if(basicData){
      return JSON.parse( atob(basicData) );
    }
    const userID = await this._user.getUserId();
    const { data } = await this._data.get('BasicData',{ user_id: { eq: userID } });
    if(data.length == 0 && location.pathname !== '/data'){
      this._router.navigateByUrl('/data');
    } else {
      const base64 = btoa(JSON.stringify(data[0]));
      localStorage.setItem('duii', base64);
    }
  }

  async getUserId() {
    try {
      const userAttributes = await fetchUserAttributes();
      return userAttributes.sub; // `sub` es el ID único del usuario
    } catch (error) {
      console.error('Error obteniendo user_id:', error);
      return undefined;
    }
  }

}
