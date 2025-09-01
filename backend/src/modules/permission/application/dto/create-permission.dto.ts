import { isString, IsString } from "class-validator";
import { Type } from "class-transformer";

export class createPermission {
    @IsString()
    nama!: string;
    
    @Type(() => Date)
    create_date!: Date;

    @IsString()
    create_by!: Date;
}
