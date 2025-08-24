export class User {
  id!: string;
  username!: string;
  password!: string;
  id_role!: string;
  create_date!: Date;
  update_date?: Date | null;
  create_by!: string;
  update_by?: string | null;
  role?: any;
  rolePermission?: any;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}