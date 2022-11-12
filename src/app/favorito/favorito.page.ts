import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Favorito } from '../models/favorito.model';
import { AuthService } from '../services/auth.service';
import { FavoritosService } from '../services/favoritos.service';
//import { GaleriaFotosService } from '../services/galeria-fotos.service';
import { Proveedor1Service } from '../services/proveedor1.service';

// Photo library
//import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

  public listaFav: Favorito[];
  public nuevoListado: Favorito[];


  constructor(
    public favoritosService: FavoritosService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public proveedor: Proveedor1Service,
    //public galeriaFotos: GaleriaFotosService,
    public authService: AuthService,
    //private photoLibrary: PhotoLibrary,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.listaFav = this.favoritosService.favoritosDelUsuario;

    console.log(this.authService.email);

    this.nuevoListado = this.listaFav.filter((listaItem)=> listaItem.email === this.authService.email);
  }

  // async eliminarLista(listaItem: Favorito) {
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   const user = await this.favoritos.eliminarLista(listaItem);
  //   await loading.dismiss();
  //   this.showAlert('Favorito eliminado', 'xx');
  //   console.log('Eliminar lista:', listaItem);

  // }


  async eliminarLista(listaItem: Favorito) {
    const alerta = await this.alertController.create({
      header: 'Seguro que quieres eliminar el lugar de Favoritos',

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'ELiminar',
          handler: (data: any) => {
            const esValido = true;
            if (esValido) {

                this.favoritosService.eliminarLista(listaItem);
              this.presentToast('Lugar eliminado correctamente!');
              this.doRefresh();
            }
          }
        }
      ]
    });
    await alerta.present();
  }

  async presentToast(mensage: string) {
    const toast = await this.toastController.create({
      message: mensage,
      duration: 2000
    });
    toast.present();
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  doRefresh() {
    this.listaFav = null; // this is replacement of splice
    this.ngOnInit(); //
    setTimeout(() => {
      //this.router.navigate(['/favorito']);
  }, 2000);
  }

  async verLugar(id: string, nombre: string){
    console.log('Dio click en ' + id);
    this.proveedor.idLugar = id;
    this.proveedor.nombreLugar = nombre;
    this.router.navigateByUrl('lugar', { replaceUrl: true });
  }

  // abrirGaleriaDelDispositivo(){
  //   console.log("abriendo galería del dispositivo");
  //   this.galeriaFotos.getLibreriaFotos();

  // }


//   verFotosDelDispositivo(){
//     console.log('llamando getLibrary');

//     this.photoLibrary.requestAuthorization().then(() => {

//       this.photoLibrary.getLibrary().subscribe({
//         next: library => {
//           // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//           library.forEach(function(libraryItem) {
//             console.log(libraryItem.id); // La ID de la foto
//             console.log(libraryItem.photoURL); // La URL de la imagen, será diferente según la plataforma.
//             console.log(libraryItem.thumbnailURL); // La URL de la miniatura, será diferente según la plataforma.
//             console.log(libraryItem.fileName); //El nombre de la imagen seleccionada.
//             console.log(libraryItem.width); //El ancho
//             console.log(libraryItem.height); //El alto
//             console.log(libraryItem.creationDate); //La fecha en la que se crea el archivo.
//             console.log(libraryItem.latitude); //En caso de que esté geolocalizado, la latitud.
//             console.log(libraryItem.longitude); //Lo mismo que la anterior, pero para la longitud.
//             console.log(libraryItem.albumIds);    // Un array de IDS de álbumes a los que pertenece esta imagen
//           });
//         },

//         error: err => { console.log('No hay fotos'); },
//         complete: () => { console.log('Se ha terminado la selección'); }
//       });
//     })
//     .catch(err => console.log('No hay permisos para realizar esta acción'));
// }
}
