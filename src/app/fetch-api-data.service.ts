// core modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs modules
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';


// const token = localStorage.getItem('token');
// const user = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  apiUrl = 'https://myfilmdb.herokuapp.com/';

  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient, private router: Router) { }



  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(this.apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }


  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(this.apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * Get all movies method
   * @returns array of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Get single movie
   * @returns specified movie
   */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/id/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    )

  }

  /**
   * Get specified director
   * @param id - Gets director by id
   * @returns a director
   */
  getDirector(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(this.apiUrl, id);
    return this.http.get(this.apiUrl + `directors/id/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Get specific genre
   * @param id - Gets genre by id
   * @returns a genre
   */
  getGenre(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    // console.log(this.apiUrl, id);
    return this.http.get(this.apiUrl + `genres/id/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Get user by username
   * @param username - user by username
   * @returns Object - user data
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Get list of favorite movies
   * @param id Gets users favorites by id
   * @returns Array - favorite movies
   */
  getFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(this.apiUrl + `users/${username}/FavoriteMovies`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Add movie to favorites
   * @param id - gets movie id and adds it to user favorites
   * @returns - success or error message
   */
  addToFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    console.log(token, 'token from addToFavoriteMovies POST request')
    return this.http.post(this.apiUrl + 'users/' + username + '/Movies/' + id, null,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Edit userData by username
   * @param userData - username and password
   * @returns success or error message
   */
  editUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(this.apiUrl + `users/${username}`, userData,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Delete user
   * @param userData - username and password
   * @returns success or error message
   */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(this.apiUrl + `users/${username}`,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /**
   * Removes movie from favorites list
   * @param id - removes movie id from favorites
   * @returns - success or error message
   */
  removeFromFavoriteMovies(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    return this.http.delete(this.apiUrl + 'users/' + username + '/Movies/' + id,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  // extract Response Data
  private extractResponseData(response: Response | Object): any {
    const body = response;
    // console.log(response);
    return body || {};
  }

  // handleError Function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something bad happened, please try again later'
    );
  }
}