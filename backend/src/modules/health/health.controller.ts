import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('health')
export class HealthController {
  @Get()
  async check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Sismakel API',
      version: '1.0.0',
    };
  }

  @Get('openapi.json')
  async getOpenApiSpec(@Res() res: Response) {
    try {
      const openApiPath = path.resolve(process.cwd(), 'src/openapi.json');
      const openApiContent = fs.readFileSync(openApiPath, 'utf8');
      const spec = JSON.parse(openApiContent);
      
      res.setHeader('Content-Type', 'application/json');
      res.json(spec);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load OpenAPI specification' });
    }
  }
} 