import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ConfigParams } from './../../shared/models/config-params';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly noPic = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  configParams: ConfigParams = {
    field: {
      type: 'genre',
      value: ''
    },
    limit: 4,
    page: 0,
    search: '',
  }
  movies: Filme[] = [];
  filtroFormGroup: FormGroup;
  selects = [
    {value: 'acao', name: 'Ação'},
    {value: 'aventura', name: 'Aventura'},
    {value: 'ciccaoCientífica', name: 'Ficção Científica'},
    {value: 'romance', name: 'Romance'},
    {value: 'terror', name: 'Terror'},
  ];
  
  constructor(private filmesService: FilmesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.listItems();
    this.filtroFormGroup = this.fb.group({
      text: [''],
      genre: ['']
    });

    this.filtroFormGroup.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.configParams.search = val;
      this.resetList();
    });
    this.filtroFormGroup.get('genre').valueChanges.subscribe((val: string) => {
      this.configParams.field = {
        type: 'genre',
        value: val
      };
      this.resetList();
    });
  }

  open(movieId: number) {
    this.router.navigateByUrl('/filmes/' + movieId);
  }

  onScroll() {
    this.listItems();
  }

  listItems() {
    this.configParams.page++;
    this.filmesService.listAll(this.configParams).subscribe({
      next: (m: Filme[]) => {
        this.movies.push(...m);
      },
      error: console.log
    });
  }

  private resetList() {
    this.configParams.page = 0;
    this.movies = [];
    this.listItems();
  }
}
