import { HttpClient } from '@angular/common/http';
import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { apiKey } from 'src/app/app-constants';
import { MovieserviceService } from 'src/app/services/movieservice.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  year:string |null;
  movies: any[] = [];
  page: number = 1;
  config: PaginationInstance = {
    id: 'omdb',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  searchMovie!: string ;
  searchMovieName: string ='movie';
  errorMessage!: String;

  constructor(private http: HttpClient, private router: Router, private movieService: MovieserviceService, private route: ActivatedRoute) {
    this.year = this.route.snapshot.paramMap.get('year');
    this.route.params.subscribe(params => {
      const year = params['year'];
      this.year = year;
      this.fetchMovies();
      // Perform actions to load the page with the specified year parameter
      // Example: Call an API, fetch data, update component properties, etc.
    });
    if(this.year != null)
    console.log(this.year)
    const state:any = this.router.getCurrentNavigation();
    const currentState = state.extras.state;
    this.searchMovieName = currentState ? currentState.movieName : '';
    if(this.searchMovieName)
      this.searchMovie = this.searchMovieName;
  }

  ngOnInit() {
    this.fetchMovies();
  }
 
  fetchMovies() {
    let searchquery = `&s=${this.searchMovieName}`;
    if(!this.searchMovieName && this.year == undefined)
      searchquery = `&s=movie`;
    if(this.year !== undefined) {
      searchquery = `&s=${this.year}`;
    } 
    this.http
      .get(
        `https://www.omdbapi.com/?apikey=${apiKey}&page=${this.config.currentPage}${searchquery}`
      )
      .subscribe((response: any) => {
        console.log('response === ', response);
        if(response.Response == 'True'){
          this.movies = response.Search;
          this.config.totalItems = response.totalResults;
          this.sortByReleaseDate();
          
        } else{
          this.movies=[];
          this.errorMessage = response.Error;
        }
        
      });
  }

  sortByReleaseDate() {
    this.movies.sort((a, b) => {
      const dateA = new Date(a.Year);
      const dateB = new Date(b.Year);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onPageChange(page: number) {
    this.config.currentPage = page;
    this.fetchMovies();
  }

  applyFilter(search: string) {
    this.config.currentPage = 1;
    this.searchMovieName = search;
    this.fetchMovies();
  }

  clearFilter(){
    this.config.currentPage = 1;
    this.searchMovie ='';
    this.searchMovieName = 'movie';
    this.fetchMovies();
  }

  goToDetails(id: string) {
    // Navigate to the details page and store the ID in the router state
    console.log('id', id);
    this.movieService.setSelectedMovie(this.searchMovie);
    this.router.navigate(['/movie-details'], { state: { id: id } });
  }
}
