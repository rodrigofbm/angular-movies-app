import { HttpClient } from '@angular/common/http';
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

  listAll(): Observable<Filme[]> {
    return this.http.get<Filme[]>(URL);
  }
}
