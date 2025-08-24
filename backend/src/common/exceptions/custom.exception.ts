import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly errors?: string[],
  ) {
    super(
      {
        success: false,
        message,
        errors,
      },
      status,
    );
  }
} 