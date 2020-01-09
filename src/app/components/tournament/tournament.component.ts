import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tournament } from '../../models/tournament';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  @Input() tournament: Tournament;
  private players: Player[] = [];
  private winner: Player;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTournament();
  }

  getTournament(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournament(id)
      .subscribe(tournament => {
        this.tournament = tournament;
        // this.getWinner();
        // this.getPlayers();
      })
  }

  // getWinner(): void {
  //   const id = this.tournament.winner;
  //   this.playerService.getPlayer(id)
  //     .subscribe(player => this.winner = player);
  // }

  // getPlayers(): void {
  //   this.playerService.getPlayers()
  //     .subscribe(players => {
  //       for (let player of players) {
  //         if (this.tournament.players.includes(player.id)) {
  //           this.players.push(player);
  //         }
  //       }
  //     })
  // }

  goBack(): void {
    this.location.back();
  }

}
