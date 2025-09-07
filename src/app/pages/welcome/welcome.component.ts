import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const logoContainer = document.getElementById('logoContainer');
    const bigLogo = document.getElementById('bigLogo');
    const welcomeEl = document.getElementById('welcome');

    
    setTimeout(() => {
      if (logoContainer) logoContainer.classList.add('hide');
      if (bigLogo) bigLogo.classList.add('show');
    }, 3000);

    setTimeout(() => {
      if (welcomeEl) welcomeEl.classList.add('fade-out');
    }, 6000);

  
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 8000);
  }
}