import { SVGIcon } from './../../../../node_modules/@progress/kendo-svg-icons/dist/svg-icon.interface.d';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons'; 
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-filter-activities',
  standalone: true,
  imports: [ButtonsModule, CommonModule, ReactiveFormsModule, DropDownsModule, MultiSelectModule],
  templateUrl: './filter-activities.component.html',
  styleUrl: './filter-activities.component.scss'
})

export class FilterActivitiesComponent implements OnInit {


filters = [
  {
    label: 'View As',
    data: [
      { text: 'Individual', value: 'Individual' },
      { text: 'Project', value: 'Project' },
      { text: 'Summary', value: 'Summary' }
    ],
    control: new FormControl({ text: 'Individual', value: 'Individual' })
  },
  {
    label: 'Functions',
    data: [
      { text: 'ENG', value: 'ENG' },
      { text: 'TECH', value: 'TECH' },
      { text: 'Test', value: 'Test' }
    ],
    control: new FormControl({ text: 'ENG', value: 'ENG' })
  },
  {
    label: 'Document Type',
    data: [
      { text: 'Internal', value: 'Internal' },
      { text: 'Step', value: 'Step' }
    ],
    control: new FormControl({ text: 'Internal', value: 'Internal' })
  },
  {
    label: 'Activity Status',
    data: [
      { text: 'Not Completed', value: 'Not Completed' },
      { text: 'Completed', value: 'Completed' },
      { text: 'Will Meet', value: 'Will Meet' }
    ],
    control: new FormControl({ text: 'Not Completed', value: 'Not Completed' })
  },
  {
    label: 'Activity Type',
    data: [
      { text: '510', value: '510' },
      { text: '560', value: '560' }
    ],
    control: new FormControl({ text: '510', value: '510' })
  },
  {
    label: 'Finish By',
    data: [
      { text: 'Late Finish', value: 'Late Finish' },
      { text: 'Early Finish', value: 'Early Finish' },
      { text: 'On Time', value: 'On Time' }
    ],
    control: new FormControl({ text: 'Late Finish', value: 'Late Finish' })
  },
  {
    label: 'Date Type',
    data: [
      { text: 'Business', value: 'Business' },
      { text: 'EU', value: 'EU' }
    ],
    control: new FormControl({ text: 'Business', value: 'Business' })
  }
];

  // filters = [
  //   { label: 'View As',data: [ 'Individual' ,'Project','Summary'], control: new FormControl() },
  //   { label: 'Functions',data: ['ENG', 'TECH', 'Test'], control: new FormControl() },
  //   { label: 'Document Type', data: ['Internal', 'Step'], control: new FormControl() },
  //   { label: 'Activity Status', data: ['Not Completed', 'Completed', 'Will Meet'], control: new FormControl() },
  //   { label: 'Activity Type', data: ['510', '560'], control: new FormControl() },
  //   { label: 'Finish By', data: ['Late Finish', 'Early Finish', 'On Time'], control: new FormControl() },
  //   { label: 'Date Type', data: ['Business', 'EU'], control: new FormControl() },
  // ];
  dropdownControl = new FormControl(); 

  buttons = [
    { label: 'Total Documents', value: 'total', count: '1321' },
    { label: 'Backlogs', value: 'backlog', count: '16' },
    { label: 'Forecast', value: 'forecast', count :'199' },
    { label: 'Not Acknowledged', value: 'noack', count :'3' },
    { label: 'Step', value: 'step', count :'5' },
    { label: 'Rulestream', value: 'rule', count:'3' },
  ];

  fwbuttons = [
    { label: 'Today', value: 'today', subtext: '1 out of 1 are not completed' },
    { label: 'FW 6, 2025 (This Week)', value: 'thisweek', subtext: '6 out of 15 are not completed' },
    { label: 'FW 7, 2025 (Next Week)', value: 'nextweek', subtext: '4 out of 8 are not completed' },
    { label: 'FW 8, 2025', value: 'later', subtext: '4 out of 8 are not completed' },
  ];

  activefwtab :string =this.fwbuttons[0].value;
  activeTab: string = 'total';

  ngOnInit(): void {
      console.log('FILTERS:', this.filters);
  this.filters.forEach(f => {
    if (!f.control || !f.data?.length) {
      console.warn(`Missing setup for filter:`, f.label);
    }
  });
   }

   onFilterChange(value: any, label: string) {
    console.log(`${label} changed to`, value);
  }

   setActiveTab(tab: string) {
    this.activeTab = tab;
  }

@Input() title = 'Panel Title';
isExpanded = signal(true);

togglePanel() {
  this.isExpanded.update(v => !v);
}

clearFilters(){

}
onSelectionChnage(value:any,dropdownName:string){
  console.log('ssssssssssssssss')
}

}
