import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { Filme } from '../shared/models/filme';

const URL = 'http://localhost:3000/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient, private configParamsService: ConfigParamsService) { }

  save(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(URL, filme);
  }

  update(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${URL}/${filme.id}`, filme);
  }

  listAll(configParams: ConfigParams): Observable<Filme[]> {
    return this.http.get<Filme[]>(URL, {
      params: this.configParamsService.configParams(configParams)
    });
  }

  listById(movieId: number): Observable<Filme> {
    return this.http.get<Filme>(`${URL}/${movieId}`);
  }

  delete(movieId: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${movieId}`);
  }
}
