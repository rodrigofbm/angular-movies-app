import { FormGroup, FormBuilder } from '@angular/forms';
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
  textFiltro: string;
  generoFiltro: string;
  movies: Filme[] = [];
  filtroFormGroup: FormGroup;
  selects = [
    {value: 'acao', name: 'Ação'},
    {value: 'aventura', name: 'Aventura'},
    {value: 'ciccaoCientífica', name: 'Ficção Científica'},
    {value: 'romance', name: 'Romance'},
    {value: 'terror', name: 'Terror'},
  ];
  
  constructor(private filmesService: FilmesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.listItems();
    this.filtroFormGroup = this.fb.group({
      text: [''],
      genre: ['']
    });

    this.filtroFormGroup.get('text').valueChanges.subscribe((val: string) => {
      this.textFiltro = val;
      this.resetList();
    });
    this.filtroFormGroup.get('genre').valueChanges.subscribe((val: string) => {
      this.generoFiltro = val;
      this.resetList();
    });
  }

  open() {}

  onScroll() {
    this.listItems();
  }

  listItems() {
    this.pageNum++;
    this.filmesService.listAll(this.pageNum, this.qtdItems, this.textFiltro, this.generoFiltro).subscribe({
      next: (m: Filme[]) => {
        this.movies.push(...m);
      },
      error: console.log
    });
  }

  private resetList() {
    this.pageNum = 0;
    this.movies = [];
    this.listItems();
  }
}
