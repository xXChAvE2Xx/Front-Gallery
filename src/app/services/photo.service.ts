import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/photo';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  URI = 'http://localhost:3000/api/photos/';
  constructor(private http: HttpClient) {}

  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.URI, fd);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.URI);
  }

  getPhoto(id: number) {
    return this.http.get(this.URI + id);
  }

  deletePhoto(id: number) {
    return this.http.delete(this.URI + id);
  }

  updatePhoto(id: number, title: string, description: string) {
    return this.http.put(this.URI + id, { title, description });
  }
}
