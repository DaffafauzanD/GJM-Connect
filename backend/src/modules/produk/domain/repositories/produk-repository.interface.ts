import { PaginatedResponse } from "src/common/interfaces";
import { PaginationDto } from "src/common/dto";
import { Produk } from "../entities/produk.entity";
import { CreateProdukDto } from "../../application/dto/create-produk.dto";

export interface ProdukRepositoryInterface {
  findAllProduks(pagination: PaginationDto): Promise<PaginatedResponse<Produk>>;
  findProdukById(id: string): Promise<Produk | null>;
  findProdukByName(name: string): Promise<Produk | null>;
  createProduk(produk: CreateProdukDto): Promise<Produk>;
  updateProduk(id: string, produk: Partial<Produk>): Promise<Produk | null>;
  deleteProduk(id: string): Promise<boolean>;
}