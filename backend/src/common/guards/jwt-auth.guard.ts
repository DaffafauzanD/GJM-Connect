import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    
    const authHeader = request.headers.authorization;
    const cookieToken = request.cookies?.access_token;

    if (!authHeader && !cookieToken) {
      throw new UnauthorizedException('No token provided');
    }

    if (!authHeader && cookieToken) {
      request.headers.authorization = `Bearer ${cookieToken}`;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
} 