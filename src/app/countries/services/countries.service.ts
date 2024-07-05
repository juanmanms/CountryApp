import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((err) => {
        //mostrar un alert con el error
        alert(err.message || 'Error en la busqueda');
        return of([]);
      }),
      delay(200)
    );
  }

  //variables para guardar los datos de la busqueda
  public cacheStorage: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheCountries', JSON.stringify(this.cacheStorage));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheCountries')) return;
    this.cacheStorage = JSON.parse(localStorage.getItem('cacheCountries')!);
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStorage.byCapital = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  //busqueda por nombre
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStorage.byCountry = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  //busqueda por region
  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStorage.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
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
