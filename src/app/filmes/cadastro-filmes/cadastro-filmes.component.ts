import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Alert } from './../../shared/models/alert';
import { AlertComponent } from './../../shared/components/alert/alert.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastroForm: FormGroup;
  movieId: number;
  movie: Filme;
  selects = [
    {value: 'acao', name: 'Ação'},
    {value: 'aventura', name: 'Aventura'},
    {value: 'ciccaoCientífica', name: 'Ficção Científica'},
    {value: 'romance', name: 'Romance'},
    {value: 'terror', name: 'Terror'},
  ];

  constructor(
      public dialog: MatDialog,
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private filmeService: FilmesService) { }

  ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.params['id'];
    this.initializeForm();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        lblSuccess: 'Ir para listagem',
        lblClose: 'Cadastrar outro'
      } as Alert
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.router.navigateByUrl('/filmes')
      }else {
        this.resetForm();
      }
    });
  }

  submit (): void {
    if (this.cadastroForm.invalid) {
      return ;
    } else {
      if(!this.movie.id) {
        this.filmeService.save(this.cadastroForm.getRawValue() as Filme)
        .subscribe({
          next: () => this.openDialog(),
          error: () => {
            const config = {
              data: {
                title: 'Ops! Algo deu errado',
                description: 'Não conseguimos salvar o seu registro. Tente novamente mais tarde.'
              } as Alert
            };

            this.dialog.open(AlertComponent, config);
          }
        });
      }else {
        const movie = this.cadastroForm.getRawValue() as Filme;
        movie.id = this.movieId;

        this.filmeService.update(movie)
        .subscribe({
          next: () => this.router.navigateByUrl('/filmes'),
          error: () => {
            const config = {
              data: {
                title: 'Ops! Algo deu errado',
                description: 'Não conseguimos salvar o seu registro. Tente novamente mais tarde.'
              } as Alert
            };

            this.dialog.open(AlertComponent, config);
          }
        })
      }
    }
  }

  resetForm (): void {
    this.cadastroForm.reset();
  }

  private initializeForm() {
    if(this.movieId) {
      this.filmeService.listById(this.movieId).subscribe({
        next: (filme: Filme) => {
          if(filme)this.movie = filme;

          this.createForm();
        },
        error: console.log
      })
    }else {
      this.movie = {
        id: null,
        title: '',
        description: '',
        genre: '',
        rate: 0,
        releaseDate: null,
        urlIMDb: '',
        urlPhoto: ''
      }
      this.createForm();
    }
  }

  private createForm() {
    this.cadastroForm = this.fb.group({
      title: [this.movie.title, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: [this.movie.urlPhoto, [Validators.minLength(10)]],
      releaseDate: [this.movie.releaseDate, [Validators.required]],
      description: [this.movie.description],
      rate: [this.movie.rate, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [this.movie.urlIMDb, [Validators.minLength(10)]],
      genre: [this.movie.genre, [Validators.required]]
    });
  }
}
