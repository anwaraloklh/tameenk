import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ErrorType } from '../enums/error-type.enum';

@Component({
  standalone: true,
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less'],
  imports: [
    NzIconModule,
    NzSpaceModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzGridModule,
  ],
})
export class ErrorComponent implements OnInit {
  title: string = 'Internal Server Error';
  message: string =
    "An error occurred while trying to performe some opertations, please contact SIIB's IT-Developers";
  backgroundImageClass: string = 'error-500';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const data=this.route.snapshot.data;
    const type=this.route.snapshot.data['Type'];
       
        switch (type) {
          case ErrorType.NotFound:
            this.title = 'Page not found';
            this.backgroundImageClass='error-404'
            this.message =
              'The page you are loojing for does not found in the system.';
            break;

          case ErrorType.Unauthorized:
            this.backgroundImageClass='error-401'

            this.title = 'Unauthorized !';
            this.message =
              'You are not aithorized to do any operation in the system, please login first.';
            break;

          case ErrorType.Forbeddien:
            this.backgroundImageClass='error-403'

            this.title = 'Forbeddien !';
            this.message =
              'You do not have the permission to access or do this operation.';
            break;

          default:
            break;
        }
     
  }
}
