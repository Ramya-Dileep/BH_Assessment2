import { Component, OnInit,OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {SidebarService} from '../../service/sidebar.service';

@Component({
  selector: 'app-side-filter-panel',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './side-filter-panel.component.html',
  styleUrl: './side-filter-panel.component.scss'
})

export class SideFilterPanelComponent implements OnInit, OnDestroy {

isCollapsed = false;
private collapseSubscription: Subscription = new Subscription;

  constructor(private sidebarService: SidebarService) {}
  navItems = [
    { id: 1, label: 'Home', icon: 'home', routerLink: '/home' },
    { id: 2, label: 'Settings', icon: 'settings', routerLink: '/settings' },
    // Add more items as needed
  ];

   ngOnInit() {
    this.collapseSubscription = this.sidebarService.isCollapsed$.subscribe(
      (state: boolean) => {
        this.isCollapsed = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.collapseSubscription) {
      this.collapseSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
