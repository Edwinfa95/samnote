import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateClient } from 'aws-amplify/data';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Schema } from '../../../../amplify/data/resource';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

  loading = true;
  warnings!:string;
  dataBasicId!:string;
  userID!:string;
  documentTypes = [
    { id: 'CC', label: 'Cedula de Ciudadania' },
    { id: 'CE', label: 'Cedula de Extrangeria' },
    { id: 'PP', label: 'PASAPORTE' },
    { id: 'NIT', label: 'NIT' }
  ]

  basicDataForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cellphoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    documentType: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', Validators.required),
    user_id: new FormControl('',[Validators.required, Validators.min(0)])
  });

  constructor(
    private _user: UserService,
    private _data: DataService
  ){}

  async ngOnInit() {
    this.basicDataForm.disable()
    const userID = await this._user.getUserId(); // 🔹 Obtener el user_id antes de cargar datos
    if (userID) {
      this.loadSavedData(userID); // 🔹 Cargar solo datos del usuario
    }
  }

  // 🔹 Cargar solo los datos del usuario autenticado
  async loadSavedData(userID:string) {
    try {
      this.userID = userID;
      this.basicDataForm.patchValue({ user_id: userID })
      const { data } = await this.getData();
      this.basicDataForm.enable()
      if(data.length == 0){
        this.warnings = 'Antes de navegar por el sitio deberas ingresar tus datos basicos!';
      } else {
        this.dataBasicId = data[0].id;
        this.basicDataForm.patchValue({
          ...data[0]
        });
        this.basicDataForm.get('name')?.disable();
        this.basicDataForm.get('lastName')?.disable();
        this.basicDataForm.get('documentType')?.disable();
        this.basicDataForm.get('documentNumber')?.disable();
      }
      this.loading = false;
      //this.savedData = data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async onSubmit() {
    if (this.basicDataForm.valid) {
      const formData = this.basicDataForm.value;
      try {
        if(!this.dataBasicId){
          const result:any = await this._data.create('BasicData', formData);
          this.dataBasicId = result.id;
        } else {
          await this._data.update('BasicData', this.dataBasicId, formData);
          localStorage.setItem('duii', btoa(JSON.stringify({ id: this.dataBasicId, ...formData })));
        }
        alert('Datos guardados con éxito');
      } catch (error) {
        console.error('Error al guardar:', error);
      }
    }
  }

  async getData(){
    let basicData = localStorage.getItem('duii');
    if(basicData){
      return { data: [JSON.parse( atob(basicData) )] };
    }
    return await this._data.get('BasicData',{ user_id: { eq: this.userID } });
  }

}
