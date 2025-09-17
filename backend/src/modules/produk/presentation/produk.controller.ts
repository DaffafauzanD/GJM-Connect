import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdukService } from '../application/services/produk.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { ProdukDto } from 'src/modules/produk/application/dto/produk.dto';
import { PaginationDto } from 'src/common/dto';
import { CreateProdukDto } from '../application/dto/create-produk.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('Products')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this.produkService.findAllProduks(pagination);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.produkService.findProdukById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConflictResponse({
    description: 'Product with this name already exists or validation error',
    schema: {
      example: {
        success: false,
        message: 'Product with this name already exists',
        errors: ['Duplicate product name'],
        timestamp: '2025-08-25T10:27:34.302Z',
      },
    },
  })
  async create(@Body() produkDto: CreateProdukDto) {
    return this.produkService.createProduk(produkDto);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() produkDto: Partial<ProdukDto>) {
    return this.produkService.updateProduk(id, produkDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.produkService.deleteProduk(id);
  }
}
