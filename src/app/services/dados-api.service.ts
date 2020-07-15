import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DadosApiService {

  urlApi = 'http://localhost:3333';

  private progressSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getPartituras(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/partituras`)
      .pipe(
        catchError(error => of(`Erro ao tentar fazer a requisição: ${error.message}`))
      );
  }

  salvar(data: any) {
    const  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    console.log(JSON.stringify(data));

    return this.http.post(`${this.urlApi}/partituras`, data, httpOptions).pipe(
      catchError(error => of(`Erro ao tentar fazer a requisição: ${error.message}`))
    );
  }

  upload(file: File, data?: any) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('titulo', data.titulo);
    formData.append('artista', data.artista);
    formData.append('genero', data.genero);
    formData.append('instrumento', data.instrumento);
    formData.append('usuario_id', data.usuario_id);

    console.log(formData);


    return this.http.post<any>(`${this.urlApi}/partituras`, formData,
            { reportProgress: true, observe: 'events' })
            .pipe(
              catchError(error => error)
            );
  }

  sendProgress(progress: number) {
    this.progressSubject.next(progress);
  }

  clearProgress() {
    this.progressSubject.next();
  }

  getProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }

}
