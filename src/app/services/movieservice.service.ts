import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  private selectedId!: number;
  private selectedMovie!: string;

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  getSelectedId(): number {
    return this.selectedId;
  }

  setSelectedMovie(name: string) {
    this.selectedMovie = name;
  }

  getSelectedMovie(): string {
    return this.selectedMovie;
  }
}
