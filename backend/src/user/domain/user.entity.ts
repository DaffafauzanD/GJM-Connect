export class User {
  constructor(
    public id: string,
    public username: string,
    public nama_lengkap: string,
    public active: boolean,
    public create_by?: string,
    public update_by?: string,
    public id_role?: string,
  ) {}

  activate() {
    this.active = true;
  }
}