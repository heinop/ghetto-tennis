import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { PlayerComponent } from './components/player/player.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentComponent } from './components/tournament/tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerComponent,
    TournamentsComponent,
    TournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
