import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../models/place-category/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isDarkMode = false;
  selectedLanguage = 'en';
  fontSize = 'medium';
  notificationsEnabled = true;
  dashboardLayout = 'grid';
  accentColor = '#007bff';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.setDarkTheme(!this.isDarkMode);
  }

  changeLanguage(): void {
    console.log('Language set to:', this.selectedLanguage);
    // TODO: connect translation service
  }

  updateFontSize(): void {
    document.documentElement.style.fontSize =
      this.fontSize === 'small' ? '12px' :
      this.fontSize === 'large' ? '18px' : '16px';
  }

  toggleNotifications(): void {
    console.log('Notifications:', this.notificationsEnabled ? 'Enabled' : 'Disabled');
  
  }
  

  updateLayout(): void {
    console.log('Dashboard layout changed to:', this.dashboardLayout);
    // TODO: apply to dashboard component
  }

  updateAccent(): void {
    document.documentElement.style.setProperty('--accent-color', this.accentColor);
  }
}
