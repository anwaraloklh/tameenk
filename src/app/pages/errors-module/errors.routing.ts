import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ErrorType } from './enums/error-type.enum';

export const ErrorsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '500',
        component: ErrorComponent,
        data: { Type: ErrorType.InternalServerError },
      },
      {
        path: '401',
        component: ErrorComponent,
        data: { Type: ErrorType.Unauthorized },
      },
      {
        path: '403',
        component: ErrorComponent,
        data: { Type: ErrorType.Forbeddien },
      },
      {
        path: '404',
        component: ErrorComponent,
        data: { Type: ErrorType.NotFound },
      },
    ],
  },
];


