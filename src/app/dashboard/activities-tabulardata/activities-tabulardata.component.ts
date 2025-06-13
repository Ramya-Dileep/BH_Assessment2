import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabulardataService } from '../../service/tabulardata.service';
import { GridModule } from '@progress/kendo-angular-grid';
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
  ispoData: any[] = [];
  searchControl = new FormControl('');
  filteredProjects: any[] = [];
  loading = false;

  @Input() fullscreenMode = false;
  @Output() fullscreenToggled = new EventEmitter<boolean>();

  get isFullscreen(): boolean {
    return this.fullscreenMode;
  }

  constructor(private nbaService: TabulardataService) {}

  ngOnInit(): void {
     this.loading = true; // Start loader

  this.nbaService.getTabledata().subscribe({
    next: data => {
      this.ispoData = data;
      this.filteredProjects = [...this.ispoData];
       this.loading = false;
    },
    error: err => {
      console.error('Error loading data', err);
    },
    complete: () => {
      this.loading = false; // Stop loader
    }
  });

  this.searchControl.valueChanges.subscribe(term => {
    this.applyFilter(term ?? '');
  });

    // this.nbaService.getTabledata().subscribe(data => {
    //   this.ispoData = data;
    //   this.filteredProjects = [...this.ispoData];
    // });

    // this.searchControl.valueChanges.subscribe(term => {
    //   this.applyFilter(term ?? '');
    // });
  }

  toggleFullscreen() {
    this.fullscreenToggled.emit(!this.fullscreenMode);
  }

  applyFilter(term: string) {
    const lowerTerm = term?.toLowerCase() || '';
    this.filteredProjects = this.ispoData.filter(project =>
      this.deepSearch(project, lowerTerm)
    );
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
