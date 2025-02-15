import { Client } from './../../client.class';

export class ClientSecurityClass extends Client { 

    constructor() {
        super()
    }

    protected passwordCheck(currentPassword: string, newPassword: string): boolean {
        if (currentPassword === newPassword) {
           return true;
         } else {
          return false;
        }
    }

}