import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private matchesUrl: string = 'api/matches';

  constructor(private http: HttpClient) { }

  /** GET matches by tournament. Will 404 if id not found */
  findMatchesByTournament(tournament: number): Observable<Match[]> {
    if (!tournament) {
      // if not search term, return empty Observable.
      return of([]);
    }

    return this.http.get<Match[]>(`${this.matchesUrl}/?tournament=${tournament}`)
      .pipe(
        tap(_ => this.log(`fetched matches tournament=${tournament}`)),
        catchError(this.handleError<Match[]>(`findMatchesByTournament tournament=${tournament}`))
      );
  }

  

  private log(message: string) {
    console.log(`MatchService: ${message}`);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
