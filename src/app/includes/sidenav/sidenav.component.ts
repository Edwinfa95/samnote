import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  isMobile = true;
  @Input('sidenav') sidenav!: MatSidenav;

  menu: any[]  = [
    {
      name: 'samnote',
      links: [
        { path: 'data', name: 'Datos básicos', icon: 'fact_check' },
        { path: 'shops', name: 'Puntos', icon: 'store' },
        { path: 'reports', name: 'Reportes', icon: 'pie_chart' }
      ]
    }
  ]

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

}
