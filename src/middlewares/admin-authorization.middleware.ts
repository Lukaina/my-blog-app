import { Injectable, NestMiddleware } from '@nestjs/common';

// Middleware para verificar si el usuario es un administrador.

@Injectable()
export class AdminAuthorizationMiddleware implements NestMiddleware {
  //IsAdminGuard
  use(req: any, res: any, next: () => void) {
    const user = req.user;

    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Unauthorized access');
    }
  }
}
