import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.html',
  styleUrls: ['./table-view.scss'],
  imports: [CommonModule],
  standalone: true
})
export class TableView implements OnInit {
  @Output() editGame = new EventEmitter<Game>();
  games: Game[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(): void {
    this.isLoading = true;
    this.gamesService.getAll().subscribe({
      next: (data) => {
        this.games = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load games';
        this.isLoading = false;
      }
    });
  }

  refresh(): void {
    this.fetchGames();
  }

  onEdit(game: Game): void {
    this.editGame.emit(game);
  }

  onDelete(game: Game): void {
    // if (confirm(`Are you sure you want to delete "${game.title}"?`)) {
      this.gamesService.delete(game.id).subscribe({
        next: () => {
          this.games = this.games.filter(g => g.id !== game.id);
        },
        error: () => {
          alert('Failed to delete game.');
        }
      });
    // }
  }
}
