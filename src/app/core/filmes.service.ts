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

  listAll(configParams: ConfigParams): Observable<Filme[]> {
    return this.http.get<Filme[]>(URL, {
      params: this.configParamsService.configParams(configParams)
    });
  }
}
