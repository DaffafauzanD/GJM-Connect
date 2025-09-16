import { IsOptional, IsPositive, Min, IsString, IsIn, isString, IsInt } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';


export class ProdukDto {
    @IsString()
    id!: string;

    @IsString()
    kode_produk!: string;

    @IsString()
    @ApiProperty({ example: 'Produk A' })
    nama_produk!: string;

   @IsPositive()
   @Min(0)
   @ApiProperty({ example: 10000 })
   @Type(() => Number)
   harga_jual!: number;

   @IsPositive()
   @Min(0)
   @ApiProperty({ example: 8000 })
   @Type(() => Number)
   harga_beli!: number;

   @IsPositive()
    @IsInt()
    @Min(0)
    @ApiProperty({ example: 50 })
    stock!: number;
  
    @IsPositive()
    @IsInt()
    @Min(0)
    @ApiProperty({ example: 10 })
    stock_minimal!: number;
    @IsString()
    sumber_produk!: string;

    @IsString()
    id_kategori!: string;

    @IsString()
    id_supplier!: string;

    @Type(() => Date)
    @IsOptional()
    create_date!: Date;

    @IsString()
    @ApiProperty({example: "admin"})
    create_by!: string

    @IsOptional()
    @Type(() => Date)
    update_date?: Date | null

    @IsOptional()
    @IsString()
    update_by?: string | null;
}