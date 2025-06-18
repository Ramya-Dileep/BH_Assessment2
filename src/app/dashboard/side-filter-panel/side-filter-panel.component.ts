import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { ProjectTreeService, Project } from '../../service/project-tree.service';
import { ProjectTreeNode } from '../../models/projectTree.model';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-side-filter-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule, TreeViewModule],
  templateUrl: './side-filter-panel.component.html',
  styleUrl: './side-filter-panel.component.scss',
})
// export class SideFilterPanelComponent implements OnInit, OnDestroy {
//   isCollapsed = false;
//   selectedTab: 'all' | 'my' | 'fav' = 'all';
//   @Output() selectedContractsChange = new EventEmitter<string[]>(); 

//   searchControl = new FormControl('');
//   selectedJobs = new Set<string>();
//   expandedProjects = new Set<string>();
//   expandedTrains = new Set<string>();
//   noDataFound = false;

//   allProjects: ProjectTreeNode[] = [];
//   filteredProjects: ProjectTreeNode[] = [];
//   originalProjects :  ProjectTreeNode[] = [];
//   private collapseSubscription = new Subscription();
//   private searchSubscription = new Subscription();
//   private projectSubscription = new Subscription();

//   constructor(
//     private sidebarService: SidebarService,
//     private projectService: ProjectTreeService
//   ) {}

//   ngOnInit(): void {
//     this.collapseSubscription = this.sidebarService.isCollapsed$.subscribe(
//       (state) => (this.isCollapsed = state)
//     );

//     this.searchSubscription = this.searchControl.valueChanges.subscribe((term) => {
//       this.applySearch(term || '');
//     });

//     this.projectSubscription = this.projectService.getProjects().subscribe((projects: Project[]) => {
//       console.log(projects)
//       this.allProjects = projects.map((project) => ({
//         projectName: project.contractName,
//         trains: project.trains.map((train) => ({
//           trainName: train.trainName,
//           jobNumbers: [...train.jobNumber],
//         })),
//         meta: {
//           isMyContract: project.isMyContracts === 'True',
//           isFavourite: project.isFavourite === 'True',
//         },
//       }));

//       this.applyTabFilter();
//       this.selectFirstProjectAndJobs();

//       this.filteredProjects = [...this.allProjects];
//       this.originalProjects = [...this.filteredProjects];

//     });
//   }

//   ngOnDestroy(): void {
//     this.collapseSubscription.unsubscribe();
//     this.searchSubscription.unsubscribe();
//     this.projectSubscription.unsubscribe();
//   }

//   toggleSidebar(): void {
//     this.sidebarService.toggleSidebar();
//   }

//   setTab(tab: 'all' | 'my' | 'fav'): void {
//     this.selectedTab = tab;
//     this.applyTabFilter();
//     this.selectFirstProjectAndJobs();
//   }

//   applyTabFilter(): void {
//     switch (this.selectedTab) {
//       case 'my':
//         this.filteredProjects = this.allProjects.filter((p) => p.meta?.isMyContract);
//         break;
//       case 'fav':
//         this.filteredProjects = this.allProjects.filter((p) => p.meta?.isFavourite);
//         break;
//       default:
//         this.filteredProjects = [...this.allProjects];
//     }

//     this.originalProjects = [...this.filteredProjects];
//     this.applySearch(this.searchControl.value || '');
//   }

//   // applySearch(term: string): void {
//   //   const value = term.toLowerCase().trim();

//   //   this.filteredProjects = this.filteredProjects
//   //     .map((project) => {
//   //       const projectMatch = project.projectName.toLowerCase().includes(value);

//   //       const filteredTrains = project.trains
//   //         .map((train) => {
//   //           const matchingJobs = train.jobNumbers.filter((job) =>
//   //             job.toLowerCase().includes(value)
//   //           );
//   //           return { ...train, jobNumbers: matchingJobs };
//   //         })
//   //         .filter((train) => train.jobNumbers.length > 0);

//   //       if (projectMatch || filteredTrains.length > 0) {
//   //         return {
//   //           ...project,
//   //           trains: projectMatch ? project.trains : filteredTrains,
//   //         };
//   //       }
//   //       return null;
//   //     })
//   //     .filter((p): p is ProjectTreeNode => !!p);

//   //   this.selectFirstProjectAndJobs();
//   // }


// applySearch(term: string): void {
//   const value = term.toLowerCase().trim();

//   if (!value) {
//     // If search box is cleared, reset data
//     this.filteredProjects = [...this.originalProjects]; // Ensure originalProjects is cached on init
//     this.noDataFound = false;
//     this.selectFirstProjectAndJobs();
//     return;
//   }

//   this.filteredProjects = this.originalProjects
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

//   this.noDataFound = this.filteredProjects.length === 0;

//   this.selectFirstProjectAndJobs();
// }


//   selectFirstProjectAndJobs(): void {
//     this.selectedJobs.clear();
//     this.expandedProjects.clear();
//     this.expandedTrains.clear();
  
//     if (this.filteredProjects.length > 0) {
//       const firstProject = this.filteredProjects[0];
//       this.expandedProjects.add(firstProject.projectName);
  
//       // Expand all trains in the first project
//       firstProject.trains.forEach(train => {
//         this.expandedTrains.add(train.trainName);
  
//         // Select all jobs in all trains
//         train.jobNumbers.forEach(job => this.selectedJobs.add(job));
//       });

//       setTimeout(() => this.emitSelectedContracts());    }
//   }
  
//   toggleJob(job: string): void {
//     this.selectedJobs.has(job)
//       ? this.selectedJobs.delete(job)
//       : this.selectedJobs.add(job);
//   }

//   toggleTrainExpand(trainName: string): void {
//     this.expandedTrains.has(trainName)
//       ? this.expandedTrains.delete(trainName)
//       : this.expandedTrains.add(trainName);
//   }

//   toggleTrainSelection(trainName: string, jobNumbers: string[]): void {
//     const allSelected = jobNumbers.every((job) => this.selectedJobs.has(job));
//     jobNumbers.forEach((job) => {
//       allSelected ? this.selectedJobs.delete(job) : this.selectedJobs.add(job);
//     });
//   }

//   isTrainExpanded(trainName: string): boolean {
//     return this.expandedTrains.has(trainName);
//   }

//   isTrainSelected(jobNumbers: string[]): boolean {
//     return jobNumbers.every((job) => this.selectedJobs.has(job));
//   }

//   toggleProject(projectName: string): void {
//     this.expandedProjects.has(projectName)
//       ? this.expandedProjects.delete(projectName)
//       : this.expandedProjects.add(projectName);
//   }

//   emitSelectedContracts(): void {
//     const selectedContracts = this.filteredProjects
//       .filter(project => 
//         project.trains.some(train =>
//           train.jobNumbers.some(job => this.selectedJobs.has(job))
//         )
//       )
//       .map(project => project.projectName);

//     this.selectedContractsChange.emit(selectedContracts);
//   }

//   isProjectExpanded(projectName: string): boolean {
//     return this.expandedProjects.has(projectName);
//   }

//   toggleProjectSelection(project: ProjectTreeNode): void {
//     const allJobs = project.trains.flatMap((t) => t.jobNumbers);
//     const allSelected = allJobs.every((job) => this.selectedJobs.has(job));

//     allJobs.forEach((job) => {
//       allSelected ? this.selectedJobs.delete(job) : this.selectedJobs.add(job);
//     });
//   }

//   isProjectSelected(project: ProjectTreeNode): boolean {
//     setTimeout(() => this.emitSelectedContracts());
//     const allJobs = project.trains.flatMap((t) => t.jobNumbers);
//     return allJobs.every((job) => this.selectedJobs.has(job));
//   }

//   get contractsCount(): number {
//     return this.filteredProjects.length;
//   }
// }

export class SideFilterPanelComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  selectedTab: 'all' | 'my' | 'fav' = 'all';

  @Output() selectedContractsChange = new EventEmitter<string[]>();

  searchControl = new FormControl('');
  selectedJobs = new Set<string>();
  expandedNodes = new Set<any>(); // Store expanded tree nodes (could be train or project)

  allProjects: ProjectTreeNode[] = [];
  filteredProjects: ProjectTreeNode[] = [];
  originalProjects: ProjectTreeNode[] = [];

  //  public data: any[] = [
  //       { text: 'Item 1', key: 1, children: [{text: 'Item 1.1', key: 2}, {text: 'Item 1.2', key: 3}] },
  //       { text: 'Item 2', key: 4, children: [{text: 'Item 2.1', key: 5}] },
  //       { text: 'Item 3', key: 6 },
  //   ];
    
  // checkedkeys = [1,6];

  noDataFound = false;

  private subscriptions: Subscription[] = [];
  projectSubscription: Subscription[] =[];

  constructor(
    private sidebarService: SidebarService,
    private projectService: ProjectTreeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sidebarService.isCollapsed$.subscribe(
        (state) => (this.isCollapsed = state)
      )
    );

    this.subscriptions.push(
      this.searchControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((term) => this.applySearch(term || ''))
    );



  }

  ngAfterViewInit(): void {
     this.subscriptions.push(
     this.projectService.getProjects().subscribe((projects: ProjectTreeNode[]) => {
    this.allProjects = projects;
    this.filteredProjects = [...this.allProjects];
    this.originalProjects = [...this.filteredProjects];

    this.applyTabFilter();
    this.selectFirstProjectAndJobs();

  })
);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      this.filteredProjects = this.allProjects.filter(
        (p) => p.isMyContracts === 'True'
      );
      break;
    case 'fav':
      this.filteredProjects = this.allProjects.filter(
        (p) => p.isFavourite === 'True'
      );
      break;
    default:
      this.filteredProjects = [...this.allProjects];
  }

  this.originalProjects = [...this.filteredProjects];
  this.applySearch(this.searchControl.value || '');
}



  applySearch(term: string): void {
  const value = term.toLowerCase().trim();

  if (!value) {
    this.filteredProjects = [...this.originalProjects];
    this.noDataFound = false;
    // this.selectFirstProjectAndJobs();
    return;
  }

  this.filteredProjects = this.originalProjects
    .map(project => {
      const projectMatch = project.text.toLowerCase().includes(value);

      const filteredTrains = project.children
        .map(train => {
          const matchingJobs = train.children.filter(job =>
            job.text.toLowerCase().includes(value)
          );

          if (train.text.toLowerCase().includes(value) || matchingJobs.length > 0) {
            return {
              ...train,
              children: matchingJobs.length > 0 ? matchingJobs : train.children,
            };
          }

          return null;
        })
        .filter((train): train is ProjectTreeNode => !!train);

      if (projectMatch || filteredTrains.length > 0) {
  return {
    ...project,
    children: projectMatch ? project.children : filteredTrains.map(train => ({
      ...train,
      children: train.children ?? []
    }))
  };
}

      return null;
    })
    .filter((p): p is ProjectTreeNode => !!p);

  this.noDataFound = this.filteredProjects.length === 0;
  this.selectFirstProjectAndJobs();
}


// selectFirstProjectAndJobs(): void {
//   this.selectedJobs.clear();
//   this.selectedJobIds = [];
//   this.expandedNodes.clear();

//   if (this.filteredProjects.length > 0) {
//     const firstProject = this.filteredProjects[0];
//     this.expandedNodes.add(firstProject.id);

//     firstProject.children?.forEach(train => {
//       this.expandedNodes.add(train.id);
//       train.children?.forEach(job => {
//         this.selectedJobs.add(job.id);
//       });
//     });

//     this.selectedJobIds = Array.from(this.selectedJobs);
//     console.log("@@@@@", this.selectedJobIds)
//     this.emitSelectedContracts();
//     this.cdr.detectChanges();

//   }
// }





  // Kendo TreeView bindings:

selectFirstProjectAndJobs(): void {
  this.selectedJobs.clear();
  this.selectedJobIds = [];
  this.expandedNodes.clear();

  if (this.filteredProjects.length > 0) {
    const firstProject = this.filteredProjects[0];

    // Add project itself to expanded and selected
    this.expandedNodes.add(firstProject.id);
    this.selectedJobs.add(firstProject.id); // ✅ Add parent to selected

    firstProject.children?.forEach(train => {
      this.expandedNodes.add(train.id);
      this.selectedJobs.add(train.id); // ✅ Also add intermediate train-level

      train.children?.forEach(job => {
        this.selectedJobs.add(job.id);
      });
    });

    this.selectedJobIds = Array.from(this.selectedJobs);

    console.log("@@@@@ selectedJobIds:", this.selectedJobIds);

    this.emitSelectedContracts();
    this.cdr.detectChanges();
  }
}
 
children = (dataItem: any) => of(dataItem.children);

public selectedKeys: any[] = ["p1"];


 hasChildren = (item: object): boolean =>
    !!(item as ProjectTreeNode).children?.length;


  isExpanded = (dataItem: any): boolean => {
    return this.expandedNodes.has(dataItem);
  };

  isChecked = (dataItem: ProjectTreeNode): 'checked' | 'indeterminate' | 'none' => {
  if (!dataItem.children || dataItem.children.length === 0) {
    // Leaf node (job)
    return this.selectedJobs.has(dataItem.id) ? 'checked' : 'none';
  }

  // Non-leaf node (project or train)
  const childStatuses = dataItem.children.map(child => this.isChecked(child));

  const allChecked = childStatuses.every(status => status === 'checked');
  const someChecked = childStatuses.some(status => status === 'checked' || status === 'indeterminate');

  if (allChecked) return 'checked';
  if (someChecked) return 'indeterminate';
  return 'none';
};


 onCheckedChange(checkedItems: ProjectTreeNode[]): void {
  this.selectedJobs.clear();

  // Recursive helper to collect all leaf job IDs
  const collectJobs = (node: ProjectTreeNode) => {
    if (!node.children || node.children.length === 0) {
      // Leaf node, treat as job
      this.selectedJobs.add(node.id);
    } else {
      // Recursively collect from children
      node.children.forEach(child => collectJobs(child));
    }
  };

  checkedItems.forEach(item => collectJobs(item));

  this.emitSelectedContracts();
}

selectedJobIds: string[] = ["0"];

onCheckedKeysChange(checkedKeys: string[]): void {
  this.selectedJobIds = checkedKeys;
  this.selectedJobs = new Set(checkedKeys);
  console.log("*******",this.selectedJobIds )
  this.emitSelectedContracts();

}

emitSelectedContracts(): void {
  const selectedContracts = this.allProjects
    .filter(project => {
      const hasSelectedJob = (node: ProjectTreeNode): boolean => {
        if (!node.children || node.children.length === 0) {
          return this.selectedJobs.has(node.id);
        }
        return node.children.some(child => hasSelectedJob(child));
      };
      return hasSelectedJob(project);
    })
    .map(project => project.text);

  this.selectedContractsChange.emit(selectedContracts);
  console.log("Emitted contracts:", selectedContracts);
}



// emitSelectedContracts(): void {
//   const selectedContracts = this.filteredProjects
//     .filter(project => {
//       const hasSelectedJob = (node: ProjectTreeNode): boolean => {
//         if (!node.children || node.children.length === 0) {
//           return this.selectedJobs.has(node.id);
//         }
//         return node.children.some(child => hasSelectedJob(child));
//       };
//       return hasSelectedJob(project);
//     })
//     .map(project => project.text);

//   this.selectedContractsChange.emit(selectedContracts);
//   console.log("Emitted contracts:", selectedContracts);
// }




  get contractsCount(): number {
    return this.filteredProjects.length;
  }
}
