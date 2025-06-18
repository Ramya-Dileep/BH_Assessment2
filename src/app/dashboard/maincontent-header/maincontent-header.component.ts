import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { FilterActivitiesComponent } from '../filter-activities/filter-activities.component';
import { ActivitiesTabulardataComponent } from '../activities-tabulardata/activities-tabulardata.component';

@Component({
  selector: 'app-maincontent-header',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    KENDO_DATEINPUTS,
    ButtonsModule,
    GridModule,
    DropDownsModule,
    FilterActivitiesComponent,
    ActivitiesTabulardataComponent
  ],
  templateUrl: './maincontent-header.component.html',
  styleUrl: './maincontent-header.component.scss'
})
export class MaincontentHeaderComponent implements OnInit {
  @Input() ProjectName: string = 'IEP';
  @Input() SelectedContracts :string[] =[];
  @Input() fullscreenMode: boolean = false;
  @Output() fullscreenToggled = new EventEmitter<boolean>();

  moduleName = 'Operation';
  today = new Date();
  percentage = 71;
  activeTab: string = 'ispo';
  form!: FormGroup;
   hasReassignRequests = true;

  tabButtons = [
    { label: 'ISPO', value: 'ispo' },
    { label: 'VDR', value: 'vdr' },
    { label: 'VDR Revision', value: 'vdrrev' },
    { label: 'VDR Finalization', value: 'vdrfinal' },
    { label: 'OTD Trends', value: 'otd' },
    { label: 'Engineering Productivity', value: 'engprod' },
    { label: 'Technical Alignment', value: 'techalign' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
    this.form = this.fb.group(group);
  }

  toggleFullscreen() {
    this.fullscreenToggled.emit(!this.fullscreenMode);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
