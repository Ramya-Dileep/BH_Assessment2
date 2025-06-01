import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-icon-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './side-icon-panel.component.html',
  styleUrl: './side-icon-panel.component.scss'
})
export class SideIconPanelComponent {
  navItems = [
    { id:1, label: 'dashboard', icon: 'dashboard', routerLink: '/dasahboard'},
    { id: 4, label: 'Folder', icon: 'folder', routerLink: '/folders' },
    { id:2, label: 'Settings', icon: 'settings', routerLink: '/settings' },
    { id: 3, label: 'Profile', icon: 'account_circle', routerLink: '/profile' },
    { id: 5, label: 'addFolder', icon: 'addfolder', routerLink: '/folders' }

  ];
}
