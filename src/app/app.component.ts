import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, translations } from '@aws-amplify/ui-angular';
import { I18n, parseAmplifyConfig } from 'aws-amplify/utils';

import outputs from '../../amplify_outputs.json';
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
}
