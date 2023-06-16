import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  yearRange: number[] |null;
  currentTime: number = Date.now();
  constructor(private router: Router) {
    this.yearRange = Array.from({ length: 2023 - 2015 + 1 }, (_, index) => 2015 + index);
  }
 
}
