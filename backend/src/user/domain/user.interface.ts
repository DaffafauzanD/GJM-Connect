export interface IUser {
  id: string;
  username: string;
  nama_lengkap: string;
  active: boolean;
  create_by?: string;
  update_by?: string;
  id_role?: string;
}