import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Alert } from './../../shared/models/alert';
import { AlertComponent } from './../../shared/components/alert/alert.component';
import { Filme } from './../../shared/models/filme';
import { ConfigParams } from './../../shared/models/config-params';
import { FilmesService } from './../../core/filmes.service';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss'],
})
export class VisualizarFilmeComponent implements OnInit {
  readonly noPic =
    'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  movie: Filme;
  movieId: number;
  params: ConfigParams = {
    field: {
      type: 'id',
      value: '',
    },
  };

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['id'];
    this.filmesService
      .listById(this.movieId)
      .subscribe({
        next: (movie: Filme) => (this.movie = movie),
        error: console.log,
      });
  }

  editar() {
    this.router.navigateByUrl(`/filmes/cadastro/${this.movieId}`);
  }

  delete(): void {
    const config = {
      data: {
        title: 'Excluir',
        description: 'Deseja realmente excluir esse filme?',
        lblSuccess: 'Exluir',
        lblClose: 'Cancelar',
      } as Alert,
    };

    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.filmesService
          .delete(this.movieId)
          .subscribe({
            next: () => this.router.navigateByUrl('/filmes'),
            error: () => {
              const config = {
                data: {
                  title: 'Ops! Algo deu errado',
                  description:
                    'Não conseguimos salvar o seu registro. Tente novamente mais tarde.',
                } as Alert,
              };

              this.dialog.open(AlertComponent, config);
            },
          });
      }
    });
  }
}
