import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        //mostrar un alert con el error
        alert(err.message || 'Error en la busqueda');
        return of([]);
      })
    );
  }

  //busqueda por nombre
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        //mostrar un alert con el error
        alert(err.message || 'Error en la busqueda');
        return of([]);
      })
    );
  }

  //busqueda por region

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        //mostrar un alert con el error
        alert(err.message || 'Error en la busqueda');
        return of([]);
      })
    );
  }

  //busqueda por cca3
  searchByAlphaCode(term: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${term}`;
    return this.http.get<Country[]>(url).pipe(
      map(([response]) => response || null),
      catchError((err) => {
        //mostrar un alert con el error
        alert(err.message || 'No existe el pais con ese codigo');
        return of(null);
      })
    );
  }
}
