import { PaginatedResponse } from "src/common/interfaces";
import { PaginationDto } from "src/common/dto";
import { CreateProdukDto } from "../../application/dto/create-produk.dto";
import { ProdukDto } from "../../application/dto/produk.dto";

export interface ProdukServiceInterface {
  findAllProduks(pagination: PaginationDto): Promise<PaginatedResponse<ProdukDto>>;
  findProdukById(id: string): Promise<ProdukDto | null>;
  findProdukByName(name: string): Promise<ProdukDto | null>;
  createProduk(produk: CreateProdukDto): Promise<ProdukDto>;
  updateProduk(id: string, produk: Partial<ProdukDto>): Promise<ProdukDto | null>;
  deleteProduk(id: string): Promise<boolean>;
}