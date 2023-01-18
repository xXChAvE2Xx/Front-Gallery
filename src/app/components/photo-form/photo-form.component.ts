import { Photo } from './../../interfaces/photo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  file?: File;
  photoSelected?: any;

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {}

  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
    console.log(this.file);
  }

  uploadPhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    this.photoService
      .createPhoto(title.value, description.value, this.file!)
      .subscribe(
        (res: any) => {
          if (!res.photo) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No se pudo guardar',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo.',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/photos']);
          }
        },
        (err) => console.log(err)
      );
    console.log(this.file);
    return false;
  }
}
