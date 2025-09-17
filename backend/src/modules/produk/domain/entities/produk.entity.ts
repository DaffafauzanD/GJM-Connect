import { Decimal } from "generated/prisma/runtime/library";

export class Produk {
    id!: string;
    kode_produk!: string;
    nama_produk!: string;
    harga_jual!: number;
    harga_beli!: number;
    stock!: number;
    stock_minimal!: number;
    sumber_produk!: string;
    id_kategori!: string;
    id_supplier!: string;
    create_date!: Date;
    create_by!: string;
    update_date?: Date | null;
    update_by?: string | null;
    constructor(init?: Partial<Produk>) {
        Object.assign(this, init);
    }
}