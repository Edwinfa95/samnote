import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from '../includes/sidenav/sidenav.component';
import { ToolbarComponent } from '../includes/toolbar/toolbar.component';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    SidenavComponent,
    ToolbarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  mode = new FormControl('over' as MatDrawerMode);

  constructor(
    @Inject(PLATFORM_ID) readonly platformId:any,
    private ref: ChangeDetectorRef
  ){}

  ngAfterViewInit(){
    if(isPlatformBrowser(this.platformId)){
      let width = window.innerWidth;
      if(width >= 992 && this.sidenav){
        this.mode.patchValue('side');
        this.sidenav.opened = true;
        this.ref.detectChanges();
      }
    }
  }


}
