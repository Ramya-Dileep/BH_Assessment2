import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { SideIconPanelComponent } from "./side-icon-panel/side-icon-panel.component";
import { SideFilterPanelComponent } from "./side-filter-panel/side-filter-panel.component";
import {SidebarService} from '../service/sidebar.service'
import { Subscription } from 'rxjs';
import { MaincontentHeaderComponent } from './maincontent-header/maincontent-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideIconPanelComponent, SideFilterPanelComponent, MaincontentHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  toolName : string = "OTR"

  isSidebarCollapsed = false;
  private collapseSubscription: Subscription = new Subscription;
  selectedContracts: string[] = [];
  SelectedContractsForMain : string = ""

  onContractsChanged(contracts: string[]) {
    this.selectedContracts = contracts;
    this.SelectedContractsForMain  = this.selectedContracts.join(', ')
  }

  constructor(private sidebarService: SidebarService) {

  }

  ngOnInit() {
    this.collapseSubscription = this.sidebarService.isCollapsed$.subscribe(
      (state) => {
        this.isSidebarCollapsed = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.collapseSubscription) {
      this.collapseSubscription.unsubscribe();
    }
  }

  isFullscreen = false;

  onFullscreenChanged(fullscreen: boolean) {
  this.isFullscreen = fullscreen;
}
}


