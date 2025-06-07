import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export interface Project {
  projectId: string;
  contractName: string;
  projectStatus: string;
  isMyContracts: string;
  isFavourite: string;
  trains: {
    trainId: string;
    trainName: string;
    jobNumber: string[];
  }[];
}

@Injectable({
  providedIn: 'root'
})


export class ProjectTreeService {

  private readonly dataUrl = 'assets/JSON/projecttreedata.json';

  private projects : Project[] =[];
   
  constructor(private http: HttpClient) {}  

    getProjects(): Observable<Project[]> {
      // return of(this.projects);
        return this.http.get<Project[]>(this.dataUrl);
    }
  
    getMyContracts(): Observable<Project[]> {
      return of(this.projects.filter(p => p.isMyContracts === 'True'));
    }
  
    getFavourites(): Observable<Project[]> {
      return of(this.projects.filter(p => p.isFavourite === 'True'));
    }
}
