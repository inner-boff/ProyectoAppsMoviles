import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
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

  images: LocalFile[] = [];

  constructor(
    private plt: Platform,
		private http: HttpClient,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
		this.images = [];

		const loading = await this.loadingCtrl.create({
			message: 'Loading data...'
		});
		await loading.present();

		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(result) => {
          // Revisar esta línea:
					this.loadFileData(result.files);
				},
				async (err) => {
					// Folder does not yet exists!
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
	async loadFileData(fileNames: string[]) {
		for (const f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
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

	async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
        this.saveImage(image);
    }
}

// Create a new file from a capture image
async saveImage(photo: Photo) {
  const base64Data = await this.readAsBase64(photo);

  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
  });

  // Reload the file list
  // Improve by only loading for the new image and unshifting array!
  this.loadFiles();
}


 // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
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
	async startUpload(file: LocalFile) {
		// TODO
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	async deleteImage(file: LocalFile) {
		// TODO
	}


}




