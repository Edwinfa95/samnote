import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'data',
                loadChildren: () => import('./modules/data/data.router').then(r => r.routes)
            },
            {
                path: 'shops',
                loadChildren: () => import('./modules/shops/shops.router').then(r => r.routes)
            },
            {
                path: 'employee',
                loadChildren: () => import('./modules/employee/employee.router').then(r => r.routes)
            },
            {
                path: 'reports',
                loadChildren: () => import('./modules/reports/reports.router').then(r => r.routes)
            }
        ]
    }
];
