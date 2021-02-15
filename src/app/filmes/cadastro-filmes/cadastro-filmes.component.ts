import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
      private filmeService: FilmesService,
      private router: Router) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      rate: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });
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
    }
  }

  resetForm (): void {
    this.cadastroForm.reset();
  }
}
