export class Permission {
    id!: string;
    nama!: string;
    create_date!: Date;
    create_by!: string;
    update_date?: Date | null;
    update_by?: string | null;

    constructor(init?: Partial<Permission>) {
        Object.assign(this, init);
    }
}