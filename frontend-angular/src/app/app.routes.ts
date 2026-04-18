import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage';
import { Cartpage } from './features/cartpage/cartpage';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Homepage },
    { path: 'cart', component: Cartpage }
];
