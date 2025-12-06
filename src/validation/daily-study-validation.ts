import z, { ZodType } from 'zod';

export class DailyStudyValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(3).max(200),
        description: z.string().max(1000).optional(),
        date: z.coerce.date(),
        duration: z.number().int().positive()
    });

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(3).max(200).optional(),
        description: z.string().max(1000).optional(),
        date: z.coerce.date().optional(),
        duration: z.number().int().positive().optional()
    });
}
