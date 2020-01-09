import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl: string = 'api/players';

  constructor(
    private http: HttpClient
  ) { }

  /** GET all players */
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  /** GET player by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  /** GET player by name. */
  findPlayerByName(name: string): Observable<Player> {
    if (!name.trim()) {
      // if not search term, return empty Observable.
      return of();
    }

    return this.http.get<Player>(`${this.playersUrl}/?name=${name}`)
      .pipe(
        tap(_ => this.log(`fetched player name=${name}`)),
        catchError(this.handleError<Player>(`findPlayerByName name=${name}`))
      );
  }

  private log(message: string) {
    console.log(`PlayerService: ${message}`);
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
