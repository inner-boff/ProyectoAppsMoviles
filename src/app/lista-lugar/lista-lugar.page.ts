import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// para poder tener los datos de la API
import { Proveedor1Service } from '../services/proveedor1.service';

//Interface de listado de lugares
interface ClasesEncontrada {
  nombreId:	string;
  nombre: string;
  total: string;
  id: string;
}

interface Instancia {
  headline:	string;
  nombre: string;
  claseId: string;
  clase: string;
  id: string;
}

interface Idata {

  totalFull: string;
  clasesEncontradas: ClasesEncontrada[];
  instancias: Instancia[];
  total: string;

}

@Component({
  selector: 'app-lista-lugar',
  templateUrl: './lista-lugar.page.html',
  styleUrls: ['./lista-lugar.page.scss'],
})
export class ListaLugarPage implements OnInit {
  
  data;
  lugares: Instancia[];

  constructor(
    public proveedor: Proveedor1Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    this.proveedor.obtenerLista()
    .subscribe(
      (data)=> {this.data = data;
                this.lugares = this.data.instancias},
      (error)=> {console.log(error);}
    );
  }  

  async verLugar(id: string, nombre: string){
    console.log("Dio click en " + id);
    this.proveedor.idLugar = id;
    this.proveedor.nombreLugar = nombre;
    this.router.navigateByUrl('lugar', { replaceUrl: true });
  }
}
