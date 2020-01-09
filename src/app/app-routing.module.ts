import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/player/player.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentComponent } from './components/tournament/tournament.component';


const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'tournament/:id', component: TournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
