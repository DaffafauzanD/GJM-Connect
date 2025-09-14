import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PermissionDto {
    @IsString()
    id?: string;

    @IsString()
    nama?: string;

    @Type(() => Date)
    @IsString()
    create_date!: Date;

    @IsString()
    create_by!: string;

    @Type(() => Date)
    @IsString()
    update_date?: Date | null;

    @IsOptional()
    update_by?: string | null;
}