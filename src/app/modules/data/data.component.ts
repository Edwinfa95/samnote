import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { generateClient } from 'aws-amplify/data';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Schema } from '../../../../amplify/data/resource';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const client = generateClient<Schema>();

@Component({
  selector: 'app-data',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

  basicDataForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    cellphoneNumber: new FormControl(''),
    documentType: new FormControl(''),
    documentNumber: new FormControl('')
  });

  async ngOnInit() {
    const userID = await this.getUserId(); // 🔹 Obtener el user_id antes de cargar datos
    if (userID) {
      this.loadSavedData(userID); // 🔹 Cargar solo datos del usuario
    }
  }

  // 🔹 Obtener user_id del usuario autenticado
  async getUserId() {
    try {
      const userAttributes = await fetchUserAttributes();
      return userAttributes.sub; // `sub` es el ID único del usuario
    } catch (error) {
      console.error('Error obteniendo user_id:', error);
      return null;
    }
  }

  // 🔹 Cargar solo los datos del usuario autenticado
  async loadSavedData(userID:string) {
    try {
      /*const { data } = await client.models.BasicData.list({
        filter: { user_id: { eq: userID } }, // 🔹 Filtrar por user_id
      });
      this.savedData = data;*/
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async onSubmit() {
    if (this.basicDataForm.valid) {
      const formData = this.basicDataForm.value;
      try {
        const result = await client.models.BasicData.create(formData);
        console.log('Registro exitoso:', result);
        alert('Datos guardados con éxito');
        this.basicDataForm.reset();   
      } catch (error) {
        console.error('Error al guardar:', error);
      }
    }
  }

}
