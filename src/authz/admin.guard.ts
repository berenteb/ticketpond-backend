import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtUser, Permissions } from '../types/jwt.types';

export function PermissionGuard(...permissions: Permissions[]) {
  return class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user as JwtUser;
      console.log(user);
      return user && user.permissions && user.permissions.some((permission) => permissions.includes(permission));
    }
  };
}
