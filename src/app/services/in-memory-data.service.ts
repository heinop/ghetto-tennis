import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Player } from '../models/player';
import { Tournament } from '../models/tournament';
import { Match } from '../models/match';
import { PLAYERS } from '../mock-data/players';
import { TOURNAMENTS } from '../mock-data/tournaments';
import { MATCHES } from '../mock-data/matches';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const players = PLAYERS;
    const tournaments = TOURNAMENTS;
    const matches = MATCHES;
    return {players, tournaments, matches};
  }

  // Overrides the genId method to ensure that an entity always has an id.
  // If the entity array is empty,
  // the method below returns the initial number (11).
  // if the entity array is not empty, the method below returns the highest
  // entity id + 1.
  genId<T extends Player | Match | Tournament>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
