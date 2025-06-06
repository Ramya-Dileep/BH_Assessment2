import { Component } from '@angular/core';
import {TabulardataService} from '../../service/tabulardata.service'
import {GridModule} from '@progress/kendo-angular-grid'
import {L10N_PREFIX} from '@progress/kendo-angular-l10n'
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-activities-tabulardata',
  standalone: true,
  imports: [GridModule, ReactiveFormsModule],
  templateUrl: './activities-tabulardata.component.html',
  styleUrl: './activities-tabulardata.component.scss'
})
export class ActivitiesTabulardataComponent {
  ispoData: any[] = [];
  searchControl = new FormControl('');
  filteredProjects: any[] = []; 


  constructor(private nbaService: TabulardataService) {}

  ngOnInit(): void {
    this.nbaService.getTabledata().subscribe(data => {
      this.ispoData = data;
      this.filteredProjects = [...this.ispoData];

    });
    this.searchControl.valueChanges.subscribe(term => {
      this.applyFilter(term ?? '');
    });

  }


  applyFilter(term: string) {
    const lowerTerm = term?.toLowerCase() || '';

    this.filteredProjects = this.ispoData.filter(project =>
      Object.values(project).some(value =>
        value != null && value.toString().toLowerCase().includes(lowerTerm)
      )
    );
  }

  
}
