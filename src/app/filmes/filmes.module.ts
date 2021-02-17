import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { FieldsModule } from './../shared/components/fields/fields.module';
import { VisualizarFilmeComponent } from './visualizar-filme/visualizar-filme.component';

@NgModule({
  declarations: [
    CadastroFilmesComponent,
    ListagemFilmesComponent,
    VisualizarFilmeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule,
  ],
})
export class FilmesModule { }
