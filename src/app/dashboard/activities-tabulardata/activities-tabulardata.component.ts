import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TabulardataService } from '../../service/tabulardata.service';
import { GridModule, GridDataResult, PageChangeEvent, DataStateChangeEvent,} from '@progress/kendo-angular-grid';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';


import {
  SortDescriptor,
  CompositeFilterDescriptor
} from '@progress/kendo-data-query';

import {
  process,
  State
} from '@progress/kendo-data-query';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities-tabulardata',
  standalone: true,
  imports: [GridModule, CommonModule, ReactiveFormsModule, LoaderModule, InputsModule, FormsModule ],
  templateUrl: './activities-tabulardata.component.html',
  styleUrl: './activities-tabulardata.component.scss'
})
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
 sort: SortDescriptor[] = [];
  filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };

   activeFilterColumn: string | null = null;
  columnFilters: { [key: string]: string } = {};

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

  toggleFilter(column: string): void {
  this.activeFilterColumn = this.activeFilterColumn === column ? null : column;
}


  toggleFullscreen(): void {
    this.fullscreenToggled.emit(!this.fullscreenMode);
  }

   toggleColumnFilter(column: string): void {
    this.activeFilterColumn = this.activeFilterColumn === column ? null : column;
  }

  onColumnFilterInput(): void {
    this.applyFilter(this.searchControl.value || '');
  }

  onPageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadPagedData();
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.skip = state.skip ?? 0;
    this.pageSize = state.take ?? 5;
    this.sort = state.sort ?? [];
    this.filter = state.filter as CompositeFilterDescriptor;
    this.loadPagedData();
  }


  applyFilter(term: string): void {
    const lowerTerm = term.toLowerCase();

    const globalFiltered = this.ispoData.filter(project =>
      this.deepSearch(project, lowerTerm)
    );

    const contractFiltered = this.SelectedContracts.length > 0
      ? globalFiltered.filter(project => this.SelectedContracts.includes(project.contract))
      : [];

    const columnFiltered = contractFiltered.filter(project => {
      return Object.entries(this.columnFilters).every(([key, filterValue]) => {
        return project[key]?.toLowerCase().includes(filterValue.toLowerCase());
      });
    });

    this.filteredProjects = this.SelectedContracts.length === 0 ? [] : columnFiltered;

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

private loadPagedData(): void {
    this.pagedData = process(this.filteredProjects, {
      skip: this.skip,
      take: this.pageSize,
      sort: this.sort,
      filter: this.filter
    });
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

