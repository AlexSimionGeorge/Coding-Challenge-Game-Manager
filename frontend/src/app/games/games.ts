import {Component, ViewChild} from '@angular/core';
import { Game } from './models/game.model';
import {TableView} from './table-view/table-view';
import {GamesFormComponent} from './games-form/games-form';

@Component({
  selector: 'app-games',
  templateUrl: './games.html',
  imports: [
    TableView,
    GamesFormComponent
  ],
  styleUrls: ['./games.scss']
})
export class Games {
  selectedGame: Game | null = null;
  showForm = false;
  @ViewChild(TableView) tableView!: TableView;

  onAddNew() {
    this.selectedGame = null;
    this.showForm = true;
  }

  onEditGame(game: Game) {
    this.selectedGame = game;
    this.showForm = true;
  }

  onFormSubmitted() {
    this.showForm = false;
    this.tableView.refresh();
  }
}
