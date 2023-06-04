import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryPopulation } from './population.model';

@Injectable({
  providedIn: 'root',
})
export class PopulationService {
  private apiUrl = 'http://localhost:3000/population';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<CountryPopulation[]> {
    return this.http.get<CountryPopulation[]>(this.apiUrl);
  }

  addRecord(record: CountryPopulation): Observable<CountryPopulation> {
    return this.http.post<CountryPopulation>(this.apiUrl, record);
  }

  updateRecord(id: string, record: CountryPopulation): Observable<CountryPopulation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CountryPopulation>(url, record);
  }

  deleteRecord(recordId: string): Observable<any> {
    const url = `${this.apiUrl}/${recordId}`;
    return this.http.delete(url);
  }
}
