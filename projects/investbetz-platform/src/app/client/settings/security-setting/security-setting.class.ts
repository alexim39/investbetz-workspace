import { UserDashboardClass } from '../../client.class';

export class SecuritySettingClass extends UserDashboardClass {
  constructor() {
    // Call parent class constructor
    super();
 }

 protected passwordCheck(currentPassword: string, newPassword: string): boolean {
  if (currentPassword === newPassword) {
     return true;
   } else {
    return false;
  }
 }

}
