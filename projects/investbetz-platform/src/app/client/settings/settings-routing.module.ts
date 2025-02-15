import { Routes } from '@angular/router';

import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { SecuritySettingComponent } from './security-setting/security-setting.component';

export const SettingsRouting: Routes = [
  { path: 'settings',
    children: [
      { path: '', component: ProfileSettingComponent },
      { path: 'profile', component: ProfileSettingComponent },
      { path: 'security', component: SecuritySettingComponent },
    ]
  },
];
