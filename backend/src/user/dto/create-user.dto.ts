import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  nama_lengkap?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  create_by?: string;

  @IsOptional()
  @IsString()
  update_by?: string;

  @IsOptional()
  @IsString()
  id_role?: string;
}