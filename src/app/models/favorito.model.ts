export class Favorito {
    idLugar: string;
    nombreLugar: string;
    email: string; // nuevo

    constructor(id: string, nombre: string, email: string){
        this.idLugar = id;
        this.nombreLugar = nombre;
        this.email = email;
    }
}