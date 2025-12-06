import z, { ZodType } from 'zod';

export class AssignmentValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(3).max(200),
        description: z.string().max(1000).optional(),
        dueDate: z.coerce.date(),
        courseId: z.number().int().positive()
    });

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(3).max(200).optional(),
        description: z.string().max(1000).optional(),
        dueDate: z.coerce.date().optional(),
        status: z.enum(['PENDING', 'DONE', 'LATE']).optional()
    });
}
