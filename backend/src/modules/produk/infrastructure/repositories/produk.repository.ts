import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdukRepositoryInterface } from '../../domain/repositories/produk-repository.interface';
import { PaginationDto } from 'src/common/dto';
import { PaginatedResponse } from 'src/common/interfaces';
import { Produk } from '../../domain/entities/produk.entity';
import { CreateProdukDto } from '../../application/dto/create-produk.dto';

@Injectable()
export class ProdukRepository implements ProdukRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProduks(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Produk>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.mst_produk.findMany({
        skip,
        take: limit,
      }),
      this.prisma.mst_produk.count(),
    ]);

    return {
      data: items.map((item) => ({
        ...item,
        stok: item.stock,
        stok_minimal: item.stock_minimal,
        sumber_stok: item.sumber_produk,
        harga_jual: item.harga_jual?.toNumber?.() ?? item.harga_jual,
        harga_beli: item.harga_beli?.toNumber?.() ?? item.harga_beli,
      })) as Produk[],
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findProdukById(id: string): Promise<Produk | null> {
    return this.prisma.mst_produk.findUnique({
      where: { id },
    }) as Promise<Produk | null>;
  }

  async findProdukByName(name: string): Promise<Produk | null> {
    return this.prisma.mst_produk.findFirst({
      where: { nama_produk: name },
    }) as Promise<Produk | null>;
  }

  async createProduk(produk: CreateProdukDto): Promise<Produk> {
    // Map CreateProdukDto to the expected Prisma input, ensuring all required fields are present
    const prismaData = {
      ...produk,
      sumber_produk: produk.sumber_produk, // Ensure this property exists in CreateProdukDto or map accordingly
    };

    const created = await this.prisma.mst_produk.create({
      data: prismaData,
    });

    // Map the result to the Produk entity, including all required fields
    return {
      ...created,
            nama_produk: produk.nama_produk,
            kode_produk: produk.kode_produk,
            harga_jual: produk.harga_jual,
            harga_beli: produk.harga_beli,
            stock: produk.stock,
            stock_minimal: produk.stock_minimal,
            sumber_produk: produk.sumber_produk,
            id_kategori: produk.id_kategori,
            id_supplier: produk.id_supplier,
            create_date: produk.create_date,
            create_by: produk.create_by,
    } as Produk;
  }
  
  async updateProduk(
    id: string,
    produk: Partial<Produk>,
  ): Promise<Produk | null> {
    const updated = await this.prisma.mst_produk.update({
      where: { id },
      data: produk,
    });
    return {
      ...updated,
      stok: updated.stock,
      stok_minimal: updated.stock_minimal,
      sumber_stok: updated.sumber_produk,
      harga_jual: (updated.harga_jual as any)?.toNumber?.() ?? updated.harga_jual,
      harga_beli: (updated.harga_beli as any)?.toNumber?.() ?? updated.harga_beli,
    } as Produk;
  }

  async deleteProduk(id: string): Promise<boolean> {
    try {
      await this.prisma.mst_produk.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
