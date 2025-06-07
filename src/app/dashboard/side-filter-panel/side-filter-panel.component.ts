import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { ProjectTreeService, Project } from '../../service/project-tree.service';
import { ProjectTreeNode } from '../../models/projectTree.model';

@Component({
  selector: 'app-side-filter-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './side-filter-panel.component.html',
  styleUrl: './side-filter-panel.component.scss',
})
export class SideFilterPanelComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  selectedTab: 'all' | 'my' | 'fav' = 'all';
  @Output() selectedContractsChange = new EventEmitter<string[]>(); 

  searchControl = new FormControl('');
  selectedJobs = new Set<string>();
  expandedProjects = new Set<string>();
  expandedTrains = new Set<string>();
  noDataFound = false;

  allProjects: ProjectTreeNode[] = [];
  filteredProjects: ProjectTreeNode[] = [];
  originalProjects :  ProjectTreeNode[] = [];
  private collapseSubscription = new Subscription();
  private searchSubscription = new Subscription();
  private projectSubscription = new Subscription();

  constructor(
    private sidebarService: SidebarService,
    private projectService: ProjectTreeService
  ) {}

  ngOnInit(): void {
    this.collapseSubscription = this.sidebarService.isCollapsed$.subscribe(
      (state) => (this.isCollapsed = state)
    );

    this.searchSubscription = this.searchControl.valueChanges.subscribe((term) => {
      this.applySearch(term || '');
    });

    this.projectSubscription = this.projectService.getProjects().subscribe((projects: Project[]) => {
      console.log(projects)
      this.allProjects = projects.map((project) => ({
        projectName: project.contractName,
        trains: project.trains.map((train) => ({
          trainName: train.trainName,
          jobNumbers: [...train.jobNumber],
        })),
        meta: {
          isMyContract: project.isMyContracts === 'True',
          isFavourite: project.isFavourite === 'True',
        },
      }));

      this.applyTabFilter();
      this.selectFirstProjectAndJobs();

      this.filteredProjects = [...this.allProjects];
      this.originalProjects = [...this.filteredProjects];

    });
  }

  ngOnDestroy(): void {
    this.collapseSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  setTab(tab: 'all' | 'my' | 'fav'): void {
    this.selectedTab = tab;
    this.applyTabFilter();
    this.selectFirstProjectAndJobs();
  }

  applyTabFilter(): void {
    switch (this.selectedTab) {
      case 'my':
        this.filteredProjects = this.allProjects.filter((p) => p.meta?.isMyContract);
        break;
      case 'fav':
        this.filteredProjects = this.allProjects.filter((p) => p.meta?.isFavourite);
        break;
      default:
        this.filteredProjects = [...this.allProjects];
    }

    this.originalProjects = [...this.filteredProjects];
    this.applySearch(this.searchControl.value || '');
  }

  // applySearch(term: string): void {
  //   const value = term.toLowerCase().trim();

  //   this.filteredProjects = this.filteredProjects
  //     .map((project) => {
  //       const projectMatch = project.projectName.toLowerCase().includes(value);

  //       const filteredTrains = project.trains
  //         .map((train) => {
  //           const matchingJobs = train.jobNumbers.filter((job) =>
  //             job.toLowerCase().includes(value)
  //           );
  //           return { ...train, jobNumbers: matchingJobs };
  //         })
  //         .filter((train) => train.jobNumbers.length > 0);

  //       if (projectMatch || filteredTrains.length > 0) {
  //         return {
  //           ...project,
  //           trains: projectMatch ? project.trains : filteredTrains,
  //         };
  //       }
  //       return null;
  //     })
  //     .filter((p): p is ProjectTreeNode => !!p);

  //   this.selectFirstProjectAndJobs();
  // }


applySearch(term: string): void {
  const value = term.toLowerCase().trim();

  if (!value) {
    // If search box is cleared, reset data
    this.filteredProjects = [...this.originalProjects]; // Ensure originalProjects is cached on init
    this.noDataFound = false;
    this.selectFirstProjectAndJobs();
    return;
  }

  this.filteredProjects = this.originalProjects
    .map((project) => {
      const projectMatch = project.projectName.toLowerCase().includes(value);

      const filteredTrains = project.trains
        .map((train) => {
          const matchingJobs = train.jobNumbers.filter((job) =>
            job.toLowerCase().includes(value)
          );
          return { ...train, jobNumbers: matchingJobs };
        })
        .filter((train) => train.jobNumbers.length > 0);

      if (projectMatch || filteredTrains.length > 0) {
        return {
          ...project,
          trains: projectMatch ? project.trains : filteredTrains,
        };
      }
      return null;
    })
    .filter((p): p is ProjectTreeNode => !!p);

  this.noDataFound = this.filteredProjects.length === 0;

  this.selectFirstProjectAndJobs();
}


  selectFirstProjectAndJobs(): void {
    this.selectedJobs.clear();
    this.expandedProjects.clear();
    this.expandedTrains.clear();
  
    if (this.filteredProjects.length > 0) {
      const firstProject = this.filteredProjects[0];
      this.expandedProjects.add(firstProject.projectName);
  
      // Expand all trains in the first project
      firstProject.trains.forEach(train => {
        this.expandedTrains.add(train.trainName);
  
        // Select all jobs in all trains
        train.jobNumbers.forEach(job => this.selectedJobs.add(job));
      });

      setTimeout(() => this.emitSelectedContracts());    }
  }
  
  toggleJob(job: string): void {
    this.selectedJobs.has(job)
      ? this.selectedJobs.delete(job)
      : this.selectedJobs.add(job);
  }

  toggleTrainExpand(trainName: string): void {
    this.expandedTrains.has(trainName)
      ? this.expandedTrains.delete(trainName)
      : this.expandedTrains.add(trainName);
  }

  toggleTrainSelection(trainName: string, jobNumbers: string[]): void {
    const allSelected = jobNumbers.every((job) => this.selectedJobs.has(job));
    jobNumbers.forEach((job) => {
      allSelected ? this.selectedJobs.delete(job) : this.selectedJobs.add(job);
    });
  }

  isTrainExpanded(trainName: string): boolean {
    return this.expandedTrains.has(trainName);
  }

  isTrainSelected(jobNumbers: string[]): boolean {
    return jobNumbers.every((job) => this.selectedJobs.has(job));
  }

  toggleProject(projectName: string): void {
    this.expandedProjects.has(projectName)
      ? this.expandedProjects.delete(projectName)
      : this.expandedProjects.add(projectName);
  }

  emitSelectedContracts(): void {
    const selectedContracts = this.filteredProjects
      .filter(project => 
        project.trains.some(train =>
          train.jobNumbers.some(job => this.selectedJobs.has(job))
        )
      )
      .map(project => project.projectName);

    this.selectedContractsChange.emit(selectedContracts);
  }

  isProjectExpanded(projectName: string): boolean {
    return this.expandedProjects.has(projectName);
  }

  toggleProjectSelection(project: ProjectTreeNode): void {
    const allJobs = project.trains.flatMap((t) => t.jobNumbers);
    const allSelected = allJobs.every((job) => this.selectedJobs.has(job));

    allJobs.forEach((job) => {
      allSelected ? this.selectedJobs.delete(job) : this.selectedJobs.add(job);
    });
  }

  isProjectSelected(project: ProjectTreeNode): boolean {
    setTimeout(() => this.emitSelectedContracts());
    const allJobs = project.trains.flatMap((t) => t.jobNumbers);
    return allJobs.every((job) => this.selectedJobs.has(job));
  }

  get contractsCount(): number {
    return this.filteredProjects.length;
  }
}
