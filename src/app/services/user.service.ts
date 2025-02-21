import { Injectable } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserId(): Promise<string | undefined> {
      try {
        let userId = localStorage.getItem('uid');
        if(userId){
          return userId;
        }
        const userAttributes = await fetchUserAttributes();
        if(userAttributes.sub){
          localStorage.setItem('uid',userAttributes.sub);
        }
        return userAttributes.sub; // `sub` es el ID único del usuario
      } catch (error) {
        console.error('Error obteniendo user_id:', error);
        return undefined;
      }
    }

}
