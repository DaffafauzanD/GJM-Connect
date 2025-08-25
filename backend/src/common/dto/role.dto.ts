import { IsOptional, IsPositive, Min, IsString, IsIn, isString } from 'class-validator';
import { Type } from 'class-transformer'

export class RoleDto {
    @IsString()
    id!: string;

    @IsString()
    nama!: string;

    @Type(() => Date)
    create_date!: Date;

    @IsString()
    create_by!: string;

    @IsOptional()
    @Type(() => Date)
    update_date?: Date | null;

    @IsOptional()
    @IsString()
    update_by?: string | null;
}
