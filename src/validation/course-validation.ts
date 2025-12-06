import z, { ZodType } from 'zod';

export class CourseValidation {
    static readonly CREATE: ZodType = z.object({
        code: z.string().min(2).max(20),
        name: z.string().min(3).max(100)
    });

    static readonly UPDATE: ZodType = z.object({
        code: z.string().min(2).max(20).optional(),
        name: z.string().min(3).max(100).optional()
    });
}
