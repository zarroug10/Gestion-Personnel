import { featherCalendar, featherFileText, featherHome, featherLogOut, featherUmbrella, featherUser, featherUsers, featherX, featherZap } from '@ng-icons/feather-icons';
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
  providers: [provideIcons({featherLogOut,
     featherHome,
     featherCalendar,
     featherUmbrella,
     featherFileText,
     featherZap,
     featherX,
     featherUsers,
    })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  public title = 'Gestion-personnel';
  public sidebarOpen = false;
  public menuOpen = false;

  constructor(private router: Router) {}

  public toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public isAuthPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/signup';
  }

  public toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
