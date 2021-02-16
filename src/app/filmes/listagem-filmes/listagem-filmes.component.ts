import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  movies: Filme[];

  constructor(private filmesService: FilmesService) { }

  ngOnInit() {
    this.filmesService.listAll().subscribe({
      next: (m: Filme[]) => {
        this.movies = m;
      },
      error: console.log
    });
  }

  open() {}
}
