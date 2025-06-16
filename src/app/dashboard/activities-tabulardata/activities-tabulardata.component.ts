import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabulardataService } from '../../service/tabulardata.service';
import { GridModule, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-activities-tabulardata',
  standalone: true,
  imports: [GridModule, ReactiveFormsModule, LoaderModule],
  templateUrl: './activities-tabulardata.component.html',
  styleUrl: './activities-tabulardata.component.scss'
})
export class ActivitiesTabulardataComponent {
  @Input() fullscreenMode = false;
  @Output() fullscreenToggled = new EventEmitter<boolean>();

  ispoData: any[] = [];
  filteredProjects: any[] = [];
  pagedData: GridDataResult = { data: [], total: 0 };
  searchControl = new FormControl('');
  loading = false;

  // Pagination properties
  skip = 0;
  pageSize = 5;

  get isFullscreen(): boolean {
    return this.fullscreenMode;
  }

  constructor(private nbaService: TabulardataService) {}

  ngOnInit(): void {
    this.loading = true;

    this.nbaService.getTabledata().subscribe({
      next: data => {
        this.ispoData = data;
        this.filteredProjects = [...data];
        this.loadPagedData(); // Set initial pagedData
        this.loading = false;
      },
      error: err => {
        console.error('Error loading data', err);
        this.loading = false;
      }
    });

    this.searchControl.valueChanges.subscribe(term => {
      this.applyFilter(term ?? '');
    });
  }

  toggleFullscreen() {
    this.fullscreenToggled.emit(!this.fullscreenMode);
  }

  onPageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadPagedData();
  }

  applyFilter(term: string): void {
    const lowerTerm = term.toLowerCase();

    this.filteredProjects = this.ispoData.filter(project =>
      this.deepSearch(project, lowerTerm)
    );

    this.skip = 0; // Reset to first page after filtering
    this.loadPagedData();
  }

  loadPagedData(): void {
    this.pagedData = {
      data: this.filteredProjects.slice(this.skip, this.skip + this.pageSize),
      total: this.filteredProjects.length
    };
  }

  private deepSearch(obj: any, searchTerm: string): boolean {
    if (typeof obj === 'string' || typeof obj === 'number') {
      return obj.toString().toLowerCase().includes(searchTerm);
    }

    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => this.deepSearch(value, searchTerm));
    }

    return false;
  }
}