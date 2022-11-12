import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
//import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const IMAGE_DIR = 'stored-images';

interface ArchivoLocal {
	name: string;
	path: string;
	data: string;
}

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.page.html',
  styleUrls: ['./galeria-fotos.page.scss'],
})
export class GaleriaFotosPage implements OnInit {

  images: ArchivoLocal[] = [];

  constructor(
    private plt: Platform,
		//private http: HttpClient,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.cargarArchivos();
  }

  async cargarArchivos() {
		this.images = [];

		const loading = await this.loadingCtrl.create({
			message: 'Cargando datos...'
		});
		await loading.present();

		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(resultado) => {
					this.cargarDataDelArchivo(resultado.files);
				},
				async (err) => {
					await Filesystem.mkdir({
						path: IMAGE_DIR,
						directory: Directory.Data
					});
				}
			)
			.then((_) => {
				loading.dismiss();
			});
    }
    // Get the actual base64 data of an image
	// base on the name of the file
	async cargarDataDelArchivo(fileNames: any[]) {
		for (const f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f.name}`;

      console.log('Ruta Archivo: '+filePath);

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
      console.log(readFile);
		}
	}

	// Little helper
	async presentToast(text) {
		const toast = await this.toastCtrl.create({
			message: text,
			duration: 3000
		});
		toast.present();
	}

	async seleccionarImagen() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
        this.guardarImagen(image);
    }
}

// Create a new file from a capture image
async guardarImagen(photo: Photo) {
  const base64Data = await this.readAsBase64(photo);

  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
  });

  // Reload the file list
  // Improve by only loading for the new image and unshifting array!
  this.cargarArchivos();
}

 private async readAsBase64(photo: Photo) {
  if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
          path: photo.path
      });

      return file.data;
  }
  else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
  }
}

// Helper function
// eslint-disable-next-line @typescript-eslint/member-ordering
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

	// eslint-disable-next-line @typescript-eslint/member-ordering
	async startUpload(file: ArchivoLocal) {
		// TODO
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	async borrarImagen(file: ArchivoLocal) {
		await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.cargarArchivos();
  this.presentToast('Archivo eliminado.');
	}


}




