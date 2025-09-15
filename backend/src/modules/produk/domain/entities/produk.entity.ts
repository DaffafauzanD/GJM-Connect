export class Produk {
    id!: string;
    kode_produk!: string;
    nama_produk!: string;
    harga_jual!: number;
    harga_beli!: number;
    stok!: number;
    stok_minimal!: number;
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