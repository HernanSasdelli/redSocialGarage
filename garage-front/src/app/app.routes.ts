import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

import { Layout } from './layout/layout';
import { Perfil } from './pages/perfil/perfil';
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';
import { Publicaciones } from './pages/publicaciones/publicaciones';
import { NoEncontrada } from './pages/no-encontrada/no-encontrada';

import { authGuard } from './guards/auth-guard';
import { Cargando } from './pages/cargando/cargando';
import { VerPublicacion } from './pages/ver-publicacion/ver-publicacion';

export const routes: Routes = [
     { path:'', component: Cargando},
     { path:'login', component: Login},
     { path:'registro', component: Registro},
     { path: 'garage', component: Layout,
          canActivate: [authGuard],
          children: [
               { path: 'publicacion/:id', component: VerPublicacion },
               { path: 'perfil', component: Perfil },
               { path: 'publicar', component: CrearPublicacion },
               { path: 'publicaciones', component: Publicaciones},
               { path: 'notificaciones', component: NoEncontrada },
               { path: 'actividad', component: NoEncontrada }
          ],
     },
     




     { path: '**' , component: NoEncontrada }
];
