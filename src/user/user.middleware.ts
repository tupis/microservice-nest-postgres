import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
  }
}
