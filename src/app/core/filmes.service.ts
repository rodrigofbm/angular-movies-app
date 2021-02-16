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

  listAll(pageNum: number, qtdItems: number): Observable<Filme[]> {
    let httParams = new HttpParams();
    httParams = httParams.set('_page', pageNum.toString());
    httParams = httParams.set('_limit', qtdItems.toString());

    return this.http.get<Filme[]>(URL, {
      params: httParams
    });
  }
}
