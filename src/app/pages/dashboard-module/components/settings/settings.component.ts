import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../models/place-category/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  
  toggleTheme(): void {
    this.themeService.setDarkTheme(!this.isDarkMode);
  }
}
