import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterActivitiesComponent } from '../filter-activities/filter-activities.component';
import { ActivitiesTabulardataComponent } from '../activities-tabulardata/activities-tabulardata.component';

@Component({
  selector: 'app-maincontent-header',
  standalone: true,
  imports: [DatePipe,
       KENDO_DATEINPUTS,
      ButtonsModule,
      CommonModule,
      GridModule,
      ReactiveFormsModule,
       DropDownsModule, FilterActivitiesComponent, ActivitiesTabulardataComponent],
  templateUrl: './maincontent-header.component.html',
  styleUrl: './maincontent-header.component.scss'
})
export class MaincontentHeaderComponent implements OnInit {
moduleName = 'Operation'
today = new Date();
percentage = 71;
 @Input() ProjectName: string = 'IEP';
 activeTab: string = 'ispo';
  fb: any;

setActiveTab(tab: string) {
  this.activeTab = tab;
}

tabButtons = [
  { label: 'ISPO', value: 'ispo' },
  { label: 'VDR', value: 'vdr' },
  { label: 'VDR Revision', value: 'vdrrev' },
  { label: 'VDR Finalization', value: 'vdrfinal' },
  { label: 'OTD Trends', value: 'otd' },
  { label: 'Engineering Productivity', value: 'engprod' },
  { label: 'Technical Alignment', value: 'techalign' }
];


form!: FormGroup;
isExpanded = false;
public gridData = [
  {
    ProductName: 'Chai',
    Category: 'Beverages',
    Price: 18,
    details: 'Imported from China.',
    expanded: false // ✅ Required
  },
  {
    ProductName: 'Chang',
    Category: 'Beverages',
    Price: 19,
    details: 'Also from China.',
    expanded: false // ✅ Required
  }
];


  filters = [
    { label: 'Category', key: 'category', data: ['Fruit', 'Vegetable'] },
    { label: 'Price Range', key: 'priceRange', data: ['Low', 'Medium', 'High'] },
    { label: 'Supplier', key: 'supplier', data: ['Supplier A', 'Supplier B'] },
    { label: 'Region', key: 'region', data: ['North', 'South'] },
    { label: 'Availability', key: 'availability', data: ['In Stock', 'Out of Stock'] },
  ];

  ngOnInit(): void {
    const group: any = {};
    this.filters.forEach((filter) => {
      group[filter.key] = [''];
    });
    this.form = this.fb.group(group);
  }

  
  toggleExpandCollapse(): void {
    this.isExpanded = !this.isExpanded;
    this.gridData = this.gridData.map(item => ({ ...item, expanded: this.isExpanded }));
  }

  clearFilters(): void {
    this.form.reset();
  }

  onExpandChange(event: any): void {
    event.dataItem.expanded = !event.dataItem.expanded;
  }

}
