import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo';
import { Router } from '@angular/router';
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];


  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(
      (res:any) => {
        this.photos = res['getPhotos'];
      },
      (err) => console.log(err)
    );
  }

  selectedCard(id?: number){
    this.router.navigate(['/photos', id]);
  }
}
