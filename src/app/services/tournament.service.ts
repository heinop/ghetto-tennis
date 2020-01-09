import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamentsUrl: string = 'api/tournaments';

  constructor(
    private http: HttpClient
  ) { }

  /** GET all tournaments */
  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl)
      .pipe(
        tap(_ => this.log('fetched tournaments')),
        catchError(this.handleError<Tournament[]>('getTournaments', []))
      );
  }

  /** GET tournament by year. Will 404 if id not found */
  getTournament(year: number): Observable<Tournament> {
    const url = `${this.tournamentsUrl}/${year}`;
    return this.http.get<Tournament>(url).pipe(
      tap(_ => this.log(`fetched tournament year=${year}`)),
      catchError(this.handleError<Tournament>(`getTournament year=${year}`))
    );
  }

  /** GET tournament by winner. */
  findTournamentsByWinner(winner: string): Observable<Tournament[]> {
    if (!winner) {
      // if not search term, return empty Observable.
      return of([]);
    }

    return this.http.get<Tournament[]>(`${this.tournamentsUrl}/?winner=${winner}`)
      .pipe(
        tap(_ => this.log(`fetched tournaments winner=${winner}`)),
        catchError(this.handleError<Tournament[]>(`findTournamentsByWinner winner=${winner}`))
      );
  }

  // /** GET tournaments by player. */
  // findTournamentsByPlayer(player: string): Observable<Tournament[]> {
  //   if (!player) {
  //     // if not search term, return empty Observable.
  //     return of([]);
  //   }

  //   return this.http.get<Tournament[]>(this.tournamentsUrl)
  //   .pipe(
  //     filter(tournament => tournament.players.includes(player)),
  //     //tap(_ => this.log(`fetched tournaments player=${player}`)),
  //     catchError(this.handleError<Tournament[]>('findTournamentsByPlayer', []))
  //     )
  // }

  // .pipe(
  //   filter(tournament => tournament.players.includes(player),
  //   .pipe(tap(_ => this.log(`fetched tournaments player=${player}`)),
  //   catchError(this.handleError<Tournament[]>('findTournamentsByPlayer', []))
  // )

  private log(message: string) {
    console.log(`TournamentService: ${message}`);
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
