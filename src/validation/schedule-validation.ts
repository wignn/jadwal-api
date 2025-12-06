import z, { ZodType } from 'zod';

export class ScheduleValidation {
    static readonly CREATE: ZodType = z.object({
        day: z.string().min(3).max(20),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        courseId: z.number().int().positive()
    });

    static readonly UPDATE: ZodType = z.object({
        day: z.string().min(3).max(20).optional(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional()
    });
}
