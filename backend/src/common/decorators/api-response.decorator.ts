import { applyDecorators } from "@nestjs/common";

export const ApiResponseWrapper = (
    status = 200,
    description?: string,
) => {
    return applyDecorators();
};