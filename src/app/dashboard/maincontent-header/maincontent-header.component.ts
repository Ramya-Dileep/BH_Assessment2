import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-maincontent-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './maincontent-header.component.html',
  styleUrl: './maincontent-header.component.scss'
})
export class MaincontentHeaderComponent {
moduleName = 'Operation'
today = new Date();
percentage = 71;

}
