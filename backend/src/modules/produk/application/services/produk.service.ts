import { Injectable, Inject, UnauthorizedException, ConflictException } from '@nestjs/common';
import { ProdukServiceInterface } from '../../domain/services/produk-services.interface'
import { ProdukRepositoryInterface } from '../../domain/repositories/produk-repository.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/api-response.interface';
import { Produk } from '../../domain/entities/produk.entity';
import { CreateProdukDto } from '../dto/create-produk.dto';
import { ProdukDto } from '../dto/produk.dto';

@Injectable()
export class ProdukService implements ProdukServiceInterface {
    constructor(
        @Inject('ProdukRepositoryInterface')
        private readonly produkRepository: ProdukRepositoryInterface,
    ) {}

    async findProdukById(id: string): Promise<ProdukDto | null> {
        const produk = await this.produkRepository.findProdukById(id);
        return produk ? this.toProdukDto(produk) : null;
    }

    async findProdukByName(name: string): Promise<ProdukDto | null> {
        const produk = await this.produkRepository.findProdukByName(name);
        return produk ? this.toProdukDto(produk) : null;
    }

    async createProduk(produkDto: CreateProdukDto): Promise<ProdukDto> {
        const existingProduk = await this.produkRepository.findProdukByName(produkDto.nama_produk);
        if (existingProduk) {
            throw new ConflictException('Product with this name already exists');
        }
        const produk = await this.produkRepository.createProduk(produkDto);
        return this.toProdukDto(produk);
    }

    async updateProduk(id: string, produkDto: Partial<ProdukDto>): Promise<ProdukDto | null> {
        const updated = await this.produkRepository.updateProduk(id, produkDto);
        return updated ? this.toProdukDto(updated) : null;
    }

    async deleteProduk(id: string): Promise<boolean> {
        return this.produkRepository.deleteProduk(id);
    }

    private toProdukDto(produk: Produk): ProdukDto {
        // Map Produk entity to ProdukDto
        return {
            id: produk.id,
            kode_produk: produk.kode_produk,
            nama_produk: produk.nama_produk,
            harga_jual: produk.harga_jual,
            harga_beli: produk.harga_beli,
            stock: produk.stock,
            stock_minimal: produk.stock_minimal,
            sumber_produk: produk.sumber_produk,
            id_kategori: produk.id_kategori,
            id_supplier: produk.id_supplier,
            create_date: produk.create_date,
            create_by: produk.create_by,
            update_date: produk.update_date,
            update_by: produk.update_by,
        };
    }

    async findAllProduks(pagination: PaginationDto): Promise<PaginatedResponse<ProdukDto>> {
        const paginatedProduks = await this.produkRepository.findAllProduks(pagination);
        return {
            data: paginatedProduks.data.map(produk => this.toProdukDto(produk)),
            meta: paginatedProduks.meta,
        };
    }
}