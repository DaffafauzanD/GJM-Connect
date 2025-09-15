import { IsOptional, IsPositive, Min, IsString, IsIn, isString } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';


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
    @ApiProperty({ example: 50 })
    stok_minimal!: number;

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