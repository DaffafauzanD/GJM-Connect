import { IsOptional, IsPositive, Min, IsString, IsIn, isString } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @IsString()
    @ApiProperty({ example: 'Admin' })
    nama!: string;

    @IsString()
    @ApiProperty({ example: "superadmin" })
    create_by!: string;

    @IsOptional()
    @Type(() => Date)
    update_date?: Date | null;

    @IsOptional()
    @IsString()
    update_by?: string | null;
}