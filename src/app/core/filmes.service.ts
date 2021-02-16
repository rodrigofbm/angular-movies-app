import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const URL = 'http://localhost:3000/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  save(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(URL, filme);
  }

  listAll(pageNum: number, qtdItems: number, textFiltro: string, generoFiltro: string): Observable<Filme[]> {
    let httParams = new HttpParams();
    httParams = httParams.set('_page', pageNum.toString());
    httParams = httParams.set('_limit', qtdItems.toString());
    httParams = httParams.set('_sort', 'id');
    httParams = httParams.set('_order', 'desc');
    if(textFiltro) httParams = httParams.set('q', textFiltro);
    if(generoFiltro) httParams = httParams.set('genre', generoFiltro);

    return this.http.get<Filme[]>(URL, {
      params: httParams
    });
  }
}
