import { inject } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const navGuard: CanActivateFn = (route, state) => {
  const _authServices = inject(AuthService);
  console.log(state.url);
  if (state.url == '/auth') {
    _authServices.getSnapshotUrlState(false);
    return true;
  }
  _authServices.getSnapshotUrlState(true);
  return false;
};
