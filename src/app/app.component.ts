import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, translations } from '@aws-amplify/ui-angular';
import { I18n } from 'aws-amplify/utils';
I18n.putVocabularies(translations);
I18n.setLanguage('es');

Amplify.configure(outputs);

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
