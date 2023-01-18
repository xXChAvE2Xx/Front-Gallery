import { Photo } from './../../interfaces/photo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css'],
})
export class PhotoPreviewComponent implements OnInit {
  id!: number;
  photo!: Photo;
  private readonly notifier: NotifierService;

  constructor(
    private activateroute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private notifierService: NotifierService
  ) {
    this.notifier = this.notifierService;
  }

  ngOnInit(): void {
    this.activateroute.params.subscribe((params) => {
      this.id = params['id'];
      this.photoService.getPhoto(this.id).subscribe(
        (res: any) => {
          this.photo = res;
          console.log(res.title);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  deletePhoto(id: number | undefined) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: "No seras capas de revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.photoService.deletePhoto(id!).subscribe(
            (res:any) => {
              console.log(res.message);
              if(res.message == 'Photo Deleted'){
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  'Tu foto fue eliminada.',
                  'success'
                );
                this.router.navigate(['/photos']);
              }else{
                swalWithBootstrapButtons.fire(
                  'Ohhh!',
                  'No se pudo eliminar.',
                  'error'
                );
              }

            },
            (err) => {
              console.log(err);
            }
          );
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu imagen sigue viviendo :)',
            'info'
          );
        }
      });
  }

  updatePhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    this.photoService
      .updatePhoto(this.id, title.value, description.value)
      .subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se actualizaron los datos.',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/photos', this.id]);
        },
        (err) => {
          console.log(err);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se pudo actualizar los datos.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
    return false;
  }
}
