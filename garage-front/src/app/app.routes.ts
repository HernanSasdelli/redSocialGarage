import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

import { Layout } from './layout/layout';
import { Perfil } from './pages/perfil/perfil';
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';
import { Publicaciones } from './pages/publicaciones/publicaciones';


export const routes: Routes = [
     { path:'', redirectTo: 'login', pathMatch: 'full'},
     { path:'login', component: Login},
     { path:'registro', component: Registro},
     { path: 'garage', component: Layout,
          children: [
               { path: 'perfil', component: Perfil },
               { path: 'publicar', component: CrearPublicacion },
               { path: 'publicaciones', component: Publicaciones}
          ],
     },
     




     { path: '**' ,  redirectTo: 'login'}
];
