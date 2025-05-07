import { featherCalendar, featherFileText, featherHome, featherLogOut, featherUmbrella, featherUser, featherX, featherZap } from '@ng-icons/feather-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIcon,
    NgClass,
    CommonModule,
    RouterLink,
    RouterLinkActive
    ],
  providers: [provideIcons({featherLogOut, featherHome,featherCalendar,featherUmbrella,featherFileText,featherZap,featherX,featherUser })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  public title = 'Gestion-personnel';
  public sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isAuthPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/signup';
  }
}
