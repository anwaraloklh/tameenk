import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit(): void {
 
    setTimeout(() => {
     
      this.router.navigate(['/auth/login']);
    }, 8000);

}
}