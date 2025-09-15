import { IsString, IsPositive, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  harga_jual!: number;

  @IsPositive()
  @Min(0)
  @ApiProperty({ example: 8000 })
  harga_beli!: number;

  @IsPositive()
  @Min(0)
  @ApiProperty({ example: 50 })
  stok!: number;

  @IsPositive()
  @Min(0)
  @ApiProperty({ example: 10 })
  stok_minimal!: number;

  @IsString()
  id_kategori!: string;

  @IsString()
  id_supplier!: string;
}