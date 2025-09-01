import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../application/services/auth.service';
import { LoginDto } from '../application/dto/login.dto';
import { LoginResponseDto } from '../application/dto/login-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Login user dengan username dan password, mengembalikan JWT token yang disimpan dalam cookie httpOnly',
  })
  @ApiResponse({
    status: 200,
    description: 'Login berhasil',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Username atau password salah',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.login(loginDto);

    // Set JWT token in cookie
    const cookieOptions = {
      httpOnly: process.env.NODE_ENV === 'production', // false in development
      secure: process.env.NODE_ENV === 'production', // false in development
      sameSite: (process.env.NODE_ENV === 'production' ? 'strict' : 'lax') as 'strict' | 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/', // Ensure cookie is available for all paths
    };
    
    response.cookie('access_token', result.access_token, cookieOptions);

    // Also set a non-httpOnly cookie for development debugging
    if (process.env.NODE_ENV !== 'production') {
      response.cookie('access_token_debug', result.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return result;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'User logout',
    description: 'Logout user dan menghapus JWT token dari cookie',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout berhasil',
  })
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the JWT cookies
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('access_token_debug', { path: '/' });
    
    return {
      message: 'Logout berhasil',
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Mendapatkan informasi profile user yang sedang login',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile user berhasil diambil',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Token tidak valid',
  })
  async getProfile(@Req() request: Request) {
    // User information is available in request.user after JWT validation
    return {
      user: request.user,
    };
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Verify JWT token',
    description: 'Memverifikasi apakah JWT token masih valid',
  })
  @ApiResponse({
    status: 200,
    description: 'Token valid',
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak valid',
  })
  async verifyToken(@Req() request: Request) {
    return {
      valid: true,
      user: request.user,
    };
  }

  @Post('login-swagger')
  @ApiOperation({
    summary: 'User login for Swagger',
    description: 'Login user untuk Swagger UI - mengembalikan token dalam response body',
  })
  @ApiResponse({
    status: 200,
    description: 'Login berhasil',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            access_token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                username: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Username atau password salah',
  })
  async loginForSwagger(
    @Body() loginDto: LoginDto,
  ): Promise<LoginResponseDto> {
     if (process.env.NODE_ENV === 'production') {
      throw new NotFoundException('This endpoint is not available in production.');
    }
    const result = await this.authService.login(loginDto);
    
    // Return token in response body for Swagger to use
    return result;
  }
} 