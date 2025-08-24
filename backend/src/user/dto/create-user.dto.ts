import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  nama_lengkap?: string;

  @IsOptional()
  @IsString()
  password?: string;

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