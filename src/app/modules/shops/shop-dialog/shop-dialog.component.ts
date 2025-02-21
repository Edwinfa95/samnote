import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './shop-dialog.component.html',
  styleUrl: './shop-dialog.component.scss'
})
export class ShopDialogComponent {

  shopForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private dialogRef: MatDialogRef<ShopDialogComponent>,
    private _data: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.shopForm.patchValue(data);
    }
  }

  async saveShop() {
    if (this.shopForm.valid) {
      const shopData = this.shopForm.value;
      try {
        if (this.data) {
          await this._data.update('BarberShop', this.data.id, shopData);
        } else {
          await this._data.create('BarberShop', shopData);
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error al guardar tienda:', error);
      }
    }
  }

  close(){
    this.dialogRef.close()
  }

}
