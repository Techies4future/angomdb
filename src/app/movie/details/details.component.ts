import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { apiKey } from 'src/app/app-constants';
import { MovieserviceService } from 'src/app/services/movieservice.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  id!: string;
  movieDetail!: any
  errorMessage!: string;
  isSearching!: Boolean;

  constructor(private http: HttpClient, private router: Router, private movieService: MovieserviceService ) {
    const state:any = this.router.getCurrentNavigation();
    const currentState = state.extras.state;
    this.id = currentState ? currentState.id : null;
  }

  ngOnInit(): void {
    this.isSearching = true;
    this.http
      .get(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${this.id}`
      )
      .subscribe((response: any) => {
        this.isSearching = false;
        if(response.Response == 'True'){
          this.movieDetail = response;
        } else{
          this.movieDetail= {};
          this.errorMessage = response.Error;
        }
        
      });
  }
  getObjectKeys(obj: any): { key: string, value: string }[] {
    return Object.keys(obj).map(key => ({ key, value: obj[key] }));
  }
  
  goBack() {
    // Navigate back to the listing page
    const movieName = this.movieService.getSelectedMovie();
    console.log('movieName', movieName)
    this.router.navigate(['/'], { state: { movieName: movieName } });
  }
}
