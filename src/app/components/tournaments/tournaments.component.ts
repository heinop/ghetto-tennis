import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  private tournaments: Tournament[];

  constructor(
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {
    this.getTournaments()
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

}
