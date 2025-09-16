import { IsString, IsPositive, Min, IsOptional, IsInt, Validate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Decimal } from "generated/prisma/runtime/library";

export class CreateProdukDto {

  @IsString()
  @ApiProperty({ example: "PRD-001" })
  kode_produk!: string;

  @IsString()
  @ApiProperty({ example: "Produk A" })
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
  @ApiProperty({ example: "8A2C9B4D-0E7F-4A6B-8D5C-3F1E7B9A4D6C" })
  id_kategori!: string;

  @IsString()
  @ApiProperty({ example: "A1B2C3D4-E5F6-4789-A1B2-C3D4E5F67890" })
  id_supplier!: string;

  @Type(() => Date)
      @IsOptional()
      create_date!: Date;
  
      @IsString()
      @ApiProperty({example: "admin"})
      create_by!: string
  
}