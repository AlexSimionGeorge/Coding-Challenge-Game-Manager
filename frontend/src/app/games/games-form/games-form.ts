import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Game } from '../models/game.model';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./games-form.scss']
})
export class GamesFormComponent implements OnChanges {
  @Input() game: Game | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.game) {
      this.form.patchValue(this.game);
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.game) {
      this.gamesService.update(this.game.id, formValue).subscribe(() => {
        this.formSubmitted.emit();
      });
    } else {
      this.gamesService.create(formValue).subscribe(() => {
        this.formSubmitted.emit();
      });
    }
  }
}
