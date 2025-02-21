import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../services/data.service';
import { ShopDialogComponent } from './shop-dialog/shop-dialog.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent implements OnInit {
  loading = true;
  shops: any[] = [];

  constructor(
    private _data: DataService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loading = true;
      const response = await this._data.get('BarberShop');
      this.shops = response?.data || [];
    } catch (error) {
      console.error('Error al cargar las tiendas:', error);
    } finally {
      this.loading = false;
    }
  }

  openDialog(shop: any = null) {
    const dialogRef = this.dialog.open(ShopDialogComponent, {
      width: '400px',
      data: shop
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }
}
