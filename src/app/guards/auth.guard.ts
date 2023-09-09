import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const _autService = inject(AuthService);
  const _router = inject(Router);
  return _autService.currentUser.pipe(
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        _autService.getSnapshotUrlState(true);
        return true;
      }
      return _router.createUrlTree(['./auth']);
    })
  );
};
