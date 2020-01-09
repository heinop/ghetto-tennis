import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() player: Player;
  private tournaments: number[] = [];
  private championships: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id)
      .subscribe(player => {
        this.player = player;
        this.getPlayerRecords();
      });
  }

  getPlayerRecords(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => {
        for (let tournament of tournaments) {
          if (tournament.players.includes(this.player.name)) {
            this.tournaments.push(tournament.id);
          }
          if (tournament.winner === this.player.name) {
            this.championships.push(tournament.id);
          }
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
