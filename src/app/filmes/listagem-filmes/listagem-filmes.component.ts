import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly qtdItems = 4;
  pageNum = 0;
  movies: Filme[] = [];

  constructor(private filmesService: FilmesService) { }

  ngOnInit() {
    this.listItems();
  }

  open() {}

  onScroll() {
    this.listItems();
  }

  listItems() {
    this.pageNum++;
    this.filmesService.listAll(this.pageNum, this.qtdItems).subscribe({
      next: (m: Filme[]) => {
        this.movies.push(...m);
      },
      error: console.log
    });
  }
}
