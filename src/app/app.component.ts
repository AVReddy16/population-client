import { Component, OnInit } from '@angular/core';
import { CountryPopulation } from './population.model';
import { PopulationService } from './population.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  records: CountryPopulation[] = [];
  newRecord: CountryPopulation = {
    country: '',
    population: 0,
    year: 0,
  };

  selectedRecord: CountryPopulation | null = null;
  formOpen = false;

  constructor(private populationService: PopulationService) {
    this.getRecords();
  }

  ngOnInit(): void {
    this.getRecords();
  }

  showUpdateForm(record: CountryPopulation): void {
    this.selectedRecord = record;
    this.formOpen = true;
  }

  hideForm(): void {
    this.selectedRecord = null;
    this.formOpen = false;
  }

  getRecords(): void {
    this.populationService
      .getRecords()
      .subscribe((record) => (this.records = record));
  }

  addRecord(): void {
    this.populationService.addRecord(this.newRecord).subscribe(() => {
      this.getRecords();
      this.newRecord = {
        country: '',
        population: 0,
        year: 0,
      };
    });
  }

  updateRecord(record: CountryPopulation) {
    if (record._id) {
      this.populationService.updateRecord(record._id, record).subscribe(
        (updatedRecord) => {
          const index = this.records.findIndex(
            (p) => p._id === updatedRecord._id
          );
          if (index !== -1) {
            this.records[index] = updatedRecord;
          }
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    }
  }

  deleteRecord(recordId: string): void {
    this.populationService
      .deleteRecord(recordId)
      .subscribe(() => this.getRecords());
  }
}
