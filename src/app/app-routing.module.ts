import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// imprtamos los Auth activation guards:
import { 
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate, // tanto para login como para home            
} from '@angular/fire/auth-guard'

//import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectLoggedInToLogin = () => redirectLoggedInTo(['login'])
const redirectLoggedInToRecuperar = () => redirectLoggedInTo(['recuperar-usuario'])
// para ir a lugar
const redirectLoggedInToLugar = () => redirectLoggedInTo(['lugar'])
// para ir a listaLugar
const redirectLoggedInToListaLugar = () => redirectLoggedInTo(['lista-lugar'])

// Se cambia el login a la primera posición para que la app arranque allí.
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // Si se llega al Home y no se está logueado, te lleva a Login
    ...canActivate(redirectUnauthorizedToLogin),
    // Si se está logueado, puede redirigirte a clubes de jazz
    //...canActivate(redirectLoggedInToClubesJazz)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
  },

 
  {
    path: 'recuperar-usuario',
    loadChildren: () => import('./recuperar-usuario/recuperar-usuario.module').then( m => m.RecuperarUsuarioPageModule),
    
  },
  {
    path: 'lista-lugar',
    loadChildren: () => import('./lista-lugar/lista-lugar.module').then( m => m.ListaLugarPageModule)
  },  
  {
    path: 'lugar',
    loadChildren: () => import('./lugar/lugar.module').then( m => m.LugarPageModule),
    
  },
  {
    path: 'favorito',
    loadChildren: () => import('./favorito/favorito.module').then( m => m.FavoritoPageModule)
  },  
  {
    path: 'galeria-fotos',
    loadChildren: () => import('./galeria-fotos/galeria-fotos.module').then( m => m.GaleriaFotosPageModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
