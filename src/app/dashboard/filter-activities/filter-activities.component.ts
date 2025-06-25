import { Component, Input, OnInit, SimpleChanges, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons'; 
import { DropDownListModule, DropDownsModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-filter-activities',
  standalone: true,
  imports: [
    ButtonsModule,
    CommonModule,
    ReactiveFormsModule,
    DropDownsModule,
    MultiSelectModule,
    TooltipModule
  ],
  templateUrl: './filter-activities.component.html',
  styleUrl: './filter-activities.component.scss'
})
export class FilterActivitiesComponent implements OnInit {
  @Input() title = 'Panel Title';

  // Fullscreen mode controlled by parent component
  @Input() collapsed = false;

  // User's expand/collapse preference signal
  userExpanded = signal(true);

  constructor() {
    // Keep userExpanded = false when collapsed is true
    effect(() => {
      if (this.collapsed) {
        this.userExpanded.set(false);
      }
    }, { allowSignalWrites: true });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collapsed']) {
      if (changes['collapsed'].currentValue) {
        // Fullscreen entered, collapse panel
        this.userExpanded.set(false);
      } else {
        // Fullscreen exited, expand panel by default
        this.userExpanded.set(true);
      }
    }
  }

  ngOnInit(): void {
    // Initialize expansion state based on collapsed input
    this.userExpanded.set(!this.collapsed);

    console.log('FILTERS:', this.filters);
    this.filters.forEach(f => {
      if (!f.control || !f.data?.length) {
        console.warn(`Missing setup for filter:`, f.label);
      }
    });
  }

  // Toggle panel expand/collapse state on user click
  togglePanel() {
    this.userExpanded.update(v => !v);
  }

  clearFilters() {
    this.filters.forEach(f => {
      f.control.setValue(f.default);
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onFilterChange(value: any, label: string) {
    console.log(`${label} changed to`, value);
  }

  getSelectedText(filter: any): string {
    const selectedValue = filter.control.value;
    const selectedItem = filter.data.find((item: any) => item.value === selectedValue);
    return selectedItem ? selectedItem.text : '';
  }

  onSelectionChnage(value: any, dropdownName: string) {
    console.log('Selection changed in:', dropdownName, value);
  }

  // UI state
  activefwtab: string = 'today';
  activeTab: string = 'total';

  // Dropdown filters
  filters = [
    {
      label: 'View As',
      data: [
        { text: 'Individual', value: 'Individual' },
        { text: 'Project', value: 'Project' },
        { text: 'Summary', value: 'Summary' }
      ],
      default: { text: 'Individual', value: 'Individual' },
      control: new FormControl({ text: 'Individual', value: 'Individual' })
    },
    {
      label: 'Functions',
      data: [
        { text: 'ENG', value: 'ENG' },
        { text: 'TECH', value: 'TECH' },
        { text: 'Test', value: 'Test' }
      ],
      default: { text: 'ENG', value: 'ENG' },
      control: new FormControl({ text: 'ENG', value: 'ENG' })
    },
    {
      label: 'Document Type',
      data: [
        { text: 'Internal', value: 'Internal' },
        { text: 'Step', value: 'Step' }
      ],
      default: { text: 'Internal', value: 'Internal' },
      control: new FormControl({ text: 'Internal', value: 'Internal' })
    },
    {
      label: 'Activity Status',
      data: [
        { text: 'Not Completed', value: 'Not Completed' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Will Meet', value: 'Will Meet' }
      ],
      default: { text: 'Not Completed', value: 'Not Completed' },
      control: new FormControl({ text: 'Not Completed', value: 'Not Completed' })
    },
    {
      label: 'Activity Type',
      data: [
        { text: '510', value: '510' },
        { text: '560', value: '560' }
      ],
      default: { text: '510', value: '510' },
      control: new FormControl({ text: '510', value: '510' })
    },
    {
      label: 'Finish By',
      data: [
        { text: 'Late Finish', value: 'Late Finish' },
        { text: 'Early Finish', value: 'Early Finish' },
        { text: 'On Time', value: 'On Time' }
      ],
      default: { text: 'Late Finish', value: 'Late Finish' },
      control: new FormControl({ text: 'Late Finish', value: 'Late Finish' })
    },
    {
      label: 'Date Type',
      data: [
        { text: 'Business', value: 'Business' },
        { text: 'EU', value: 'EU' }
      ],
      default: { text: 'Business', value: 'Business' },
      control: new FormControl({ text: 'Business', value: 'Business' })
    }
  ];

  buttons = [
    { label: 'Total Documents', value: 'total', count: '1321' },
    { label: 'Backlogs', value: 'backlog', count: '16' },
    { label: 'Forecast', value: 'forecast', count: '199' },
    { label: 'Not Acknowledged', value: 'noack', count: '3' },
    { label: 'Step', value: 'step', count: '5' },
    { label: 'Rulestream', value: 'rule', count: '3' },
  ];

  fwbuttons = [
    { label: 'Today', value: 'today', subtext: '1 out of 1 are not completed' },
    { label: 'FW 6, 2025 (This Week)', value: 'thisweek', subtext: '6 out of 15 are not completed' },
    { label: 'FW 7, 2025 (Next Week)', value: 'nextweek', subtext: '4 out of 8 are not completed' },
    { label: 'FW 8, 2025', value: 'later', subtext: '4 out of 8 are not completed' },
  ];
}
