import { Routes } from "@angular/router";

export const routes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./shops.component').then(c => c.ShopsComponent)
    }
];