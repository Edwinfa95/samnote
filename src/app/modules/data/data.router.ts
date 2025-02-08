import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./data.component').then(c => c.DataComponent)
    }
];