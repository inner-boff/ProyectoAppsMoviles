import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FavoritosService } from '../services/favoritos.service';
// para poder tener los datos de la api
import { Proveedor1Service } from '../services/proveedor1.service';


//Interface del lugar

interface Ubicacion {
  centroide: string;
  tipo: string;
}

interface Contenido {
  nombreId: string;
  nombre: string;
  posicion: string;
  valor: string;
}

interface Idata {
  contenido: Contenido[];
  fechaAlta: string;
  ubicacion: Ubicacion; 
  fechaUltimaModificacion: string;
  id: string;
  direccionNormalizada: string;
  fechaActualizacion: string;
  fuente: string;
  claseId: string; 
  clase: string;
  idForaneo: string;
}

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.page.scss'],
})
export class LugarPage implements OnInit {

  data;
  contenidos: Contenido[];
  dir: string;
  contenido: Contenido;
  boton: boolean;

  constructor(
    public proveedor: Proveedor1Service,
    public toastController: ToastController,
    public favoritos: FavoritosService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    this.proveedor.obtenerLugar(this.proveedor.idLugar)
    .subscribe(
      (data)=> {this.data = data;
                this.contenidos = this.data.contenido;
                this.dir = this.data.direccionNormalizada;
                this.tratarContenidos()},
      (error)=> {console.log(error);}
    );
  }  

  tratarContenidos(){
    
    var tieneDireccion = false;

    for (let i of this.contenidos) {
      
      if (i.nombreId == 'direccion'){
        tieneDireccion = true;
      } 

      if (i.valor == ''
          ||
          i.nombreId == 'redes_sociales'
         ){
        i.valor = 'n/a';
      } 

      if(i.valor != 'n/a'
         &&
         i.nombreId == 'email'){

          let mail1 = i.valor.split('>')[1];
          i.valor = mail1.split('<')[0];

         }
      
      if(i.valor != 'n/a'
         &&
        (i.nombreId == 'web'
         ||
         i.nombreId == 'pagina_web')){

          let web1 = i.valor.split('>')[1];
          i.valor = web1.split('<')[0];

          let index = i.valor.indexOf('/');

          if (index > 0){
            i.valor = i.valor.split('/')[0]
          }
         }     
    }

    if (!tieneDireccion){
      
      this.contenido = 
      {
        nombre : ' ',
        nombreId : ' ',
        posicion: ' ',
        valor: ' '
      }

      console.log(this.contenido);
      
      this.contenido.nombre = 'Dirección';
      this.contenido.nombreId = "direccion";
      var pos = this.contenidos.length + 1;
      this.contenido.posicion = pos.toString();
      this.contenido.valor = this.dir;
      console.log(this.contenido);
      this.contenidos.push(this.contenido);
    }
  }

  async presentToast1() {
    if (this.boton == true) {
      const toast = await this.toastController.create({
        message: 'Agregado a favoritos',
        duration: 500,
        position: "bottom",
      });
      toast.present()
    }
    else {
      const toast = await this.toastController.create({
        message: 'Eliminado de favoritos',
        duration: 500,
        position: "bottom",
      });
      toast.present()
    }
  }

  async guardarFavs() {
    if (this.boton == true) {
      //this.favoritos.crearLista(this.proveedor.idLugar, this.proveedor.nombreLugar);
      let creadaOk = this.favoritos.crearLista(this.proveedor.idLugar, this.proveedor.nombreLugar, this.authService.email);
      if (creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada
        console.log("Lista guardada bro: " + this.favoritos.favoritosDelUsuario);
      }     
    }
    else {
      //this.listaFav.eliminarLista(this.listaItem);
      console.log("Borrado");
    }
  }    

  colorBoton() {
    this.boton = !this.boton;
  }  

}
