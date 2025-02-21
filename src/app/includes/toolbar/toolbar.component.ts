import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-toolbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    AmplifyAuthenticatorModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  isMobile = true;
  @Input('sidenav') sidenav!: MatSidenav;

  constructor(
    @Inject(PLATFORM_ID) readonly platformId:any
  ){
    if(isPlatformBrowser(this.platformId)){
      let width = window.innerWidth;
      if(width >= 992){
        this.isMobile = false;
      }
    }
  }

  toggleNav(){
    if(this.sidenav){
      this.sidenav.toggle();
    }
  }

  async signOut(){
    try {
      await signOut({ global: true })
    } catch (error) {
      console.log('Error al desconectar', error);
    }
  }

}
