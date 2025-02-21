import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/data/resource';
import { LogService } from './log.service';

const client = generateClient<Schema>();
type IModels = 'BarberShop' | 'BasicData' | 'Customer' | 'Employee' | 'InvoiceItem' | 'Product' | 'Service' | 'SalesInvoices';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _log:LogService
  ) { }

  async get(type:IModels, filter?:any){
    try {
      let model = this.getClient(type);
      const data = await (filter? model.list({ filter }) : model.list());
      return data;
    } catch (error:any) {
      this._log.register(`DB:GET-${type}`,error);
      alert('Error al obtener los datos');
    }
  }

  async find(type:IModels, id:string){
    try {
      const data = await this.getClient(type).get({ id });
      return data;
    } catch (error:any) {
      this._log.register(`DB:FIND-${type}`,error)
    }
  }

  async create(type:IModels, body:any){
    try {
      const data = await this.getClient(type).create(body);
      return data;
    } catch (error:any) {
      this._log.register(`DB:CREATE-${type}`,error)
    }
  }

  async update(type:IModels, id:string, body:any){
    try {
      const data = await this.getClient(type).update({ id, ...body });
      return data;
    } catch (error:any) {
      this._log.register(`DB:`,error)
    }
  }

  private getClient(type: IModels){
    let modelDB:any;
    switch (type) {
      case 'BarberShop':
        modelDB = client.models.BarberShop;
        break;
      case 'BasicData':
        modelDB = client.models.BasicData;
        break;
      case 'Customer':
        modelDB = client.models.Customer;
        break;
      case 'Employee':
        modelDB = client.models.Employee;
        break;
      case 'InvoiceItem':
        modelDB = client.models.InvoiceItem;
        break;
      case 'Product':
        modelDB = client.models.Product;
        break;
      case 'SalesInvoices':
        modelDB = client.models.SalesInvoice
        break;
      case 'Service':
        modelDB = client.models.Service
        break;
    }
    return modelDB;
  }

}
