import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
// export class ActivitiesTabulardataComponent {
//   @Input() fullscreenMode = false;
//   @Output() fullscreenToggled = new EventEmitter<boolean>();
//   @Input() SelectedContracts : string[] =[]

//   ispoData: any[] = [];
//   filteredProjects: any[] = [];
//   pagedData: GridDataResult = { data: [], total: 0 };
//   searchControl = new FormControl('');
//   loading = false;

//   // Pagination properties
//   skip = 0;
//   pageSize = 5;

//   get isFullscreen(): boolean {
//     return this.fullscreenMode;
//   }

//   constructor(private nbaService: TabulardataService) {}

//   ngOnInit(): void {
//     this.loading = true;

//     this.nbaService.getTabledata().subscribe({
//       next: data => {
//         this.ispoData = data;
//         this.filteredProjects = [...data];
//         this.loadPagedData(); // Set initial pagedData
//         this.loading = false;
//       },
//       error: err => {
//         console.error('Error loading data', err);
//         this.loading = false;
//       }
//     });

//     this.searchControl.valueChanges.subscribe(term => {
//       this.applyFilter(term ?? '');
//     });
//   }

//   toggleFullscreen() {
//     this.fullscreenToggled.emit(!this.fullscreenMode);
//   }

//   onPageChange(event: PageChangeEvent): void {
//     this.skip = event.skip;
//     this.loadPagedData();
//   }

//   applyFilter(term: string): void {
//     const lowerTerm = term.toLowerCase();

//     this.filteredProjects = this.ispoData.filter(project =>
//       this.deepSearch(project, lowerTerm)
//     );

//     this.skip = 0; // Reset to first page after filtering
//     this.loadPagedData();
//   }

//   loadPagedData(): void {
//     this.pagedData = {
//       data: this.filteredProjects.slice(this.skip, this.skip + this.pageSize),
//       total: this.filteredProjects.length
//     };
//   }

//   private deepSearch(obj: any, searchTerm: string): boolean {
//     if (typeof obj === 'string' || typeof obj === 'number') {
//       return obj.toString().toLowerCase().includes(searchTerm);
//     }

//     if (typeof obj === 'object' && obj !== null) {
//       return Object.values(obj).some(value => this.deepSearch(value, searchTerm));
//     }

//     return false;
//   }
// }

// export class ActivitiesTabulardataComponent implements OnInit, OnChanges {
//   @Input() fullscreenMode = false;
//   @Output() fullscreenToggled = new EventEmitter<boolean>();
//   @Input() SelectedContracts: string[] = [];

//   ispoData: any[] = [];
//   filteredProjects: any[] = [];
//   pagedData: GridDataResult = { data: [], total: 0 };
//   searchControl = new FormControl('');
//   loading = false;

//   // Pagination
//   skip = 0;
//   pageSize = 5;

//   get isFullscreen(): boolean {
//     return this.fullscreenMode;
//   }

//   constructor(private nbaService: TabulardataService) {}

//   ngOnInit(): void {
//     this.loading = true;

//     this.nbaService.getTabledata().subscribe({
//       next: data => {
//         this.ispoData = data;
//         this.filterByContracts(); // Initial filter by contracts
//         this.loading = false;
//       },
//       error: err => {
//         console.error('Error loading data', err);
//         this.loading = false;
//       }
//     });

//     this.searchControl.valueChanges.subscribe(term => {
//       this.applyFilter(term ?? '');
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['SelectedContracts'] && this.ispoData.length > 0) {
//       this.filterByContracts();
//     }
//   }

//   toggleFullscreen(): void {
//     this.fullscreenToggled.emit(!this.fullscreenMode);
//   }

//   onPageChange(event: PageChangeEvent): void {
//     this.skip = event.skip;
//     this.loadPagedData();
//   }

//   applyFilter(term: string): void {
//     const lowerTerm = term.toLowerCase();

//     const filtered = this.ispoData.filter(project =>
//       this.deepSearch(project, lowerTerm)
//     );

//     // Apply contract filter on top of search
//     if (this.SelectedContracts.length > 0) {
//       this.filteredProjects = filtered.filter(project =>
//         this.SelectedContracts.includes(project.contract)
//       );
//     } else {
//       this.filteredProjects = [filtered];
//     }

//     this.skip = 0;
//     this.loadPagedData();
//   }

//   filterByContracts(): void {
//     if (this.SelectedContracts.length === 0) {
//       this.filteredProjects = [...this.ispoData];
//     } else {
//       this.filteredProjects = this.ispoData.filter(project =>
//         this.SelectedContracts.includes(project.contract)
//       );
//     }

//     this.skip = 0;
//     this.loadPagedData();
//   }

//   loadPagedData(): void {
//     this.pagedData = {
//       data: this.filteredProjects.slice(this.skip, this.skip + this.pageSize),
//       total: this.filteredProjects.length
//     };
//   }

//   private deepSearch(obj: any, searchTerm: string): boolean {
//     if (typeof obj === 'string' || typeof obj === 'number') {
//       return obj.toString().toLowerCase().includes(searchTerm);
//     }

//     if (typeof obj === 'object' && obj !== null) {
//       return Object.values(obj).some(value => this.deepSearch(value, searchTerm));
//     }

//     return false;
//   }
// }

export class ActivitiesTabulardataComponent implements OnInit, OnChanges {
  @Input() fullscreenMode = false;
  @Output() fullscreenToggled = new EventEmitter<boolean>();
  @Input() SelectedContracts: string[] = [];

  ispoData: any[] = [];
  filteredProjects: any[] = [];
  pagedData: GridDataResult = { data: [], total: 0 };
  searchControl = new FormControl('');
  loading = false;

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
        this.filterByContracts();
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['SelectedContracts'] && !changes['SelectedContracts'].firstChange) {
      this.filterByContracts();
    }
  }

  toggleFullscreen(): void {
    this.fullscreenToggled.emit(!this.fullscreenMode);
  }

  onPageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadPagedData();
  }

  applyFilter(term: string): void {
    const lowerTerm = term.toLowerCase();

    const filtered = this.ispoData.filter(project =>
      this.deepSearch(project, lowerTerm)
    );

    this.filteredProjects = this.SelectedContracts.length > 0
      ? filtered.filter(project => this.SelectedContracts.includes(project.contract)) // change to `contract` if applicable
      : [];

    this.skip = 0;
    this.loadPagedData();
  }

  filterByContracts(): void {
    if (!this.SelectedContracts || this.SelectedContracts.length === 0) {
      this.filteredProjects = []; // ✅ Clear table if no contracts
    } else {
      this.filteredProjects = this.ispoData.filter(project =>
        this.SelectedContracts.includes(project.contract) // change to `contract` if needed
      );
    }

    this.skip = 0;
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

