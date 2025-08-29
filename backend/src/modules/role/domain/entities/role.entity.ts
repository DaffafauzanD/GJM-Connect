export class Role {
    id!: string;
    nama!: string;
    create_date!: Date;
    create_by!: string;
    update_date?: Date | null;
    update_by?: string | null;

    constructor(init?: Partial<Role>) {
        Object.assign(this, init);
    }
}