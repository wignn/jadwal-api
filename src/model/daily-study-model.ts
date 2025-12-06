import type { DailyStudy } from '../generated/index.d';

export type DailyStudyResponse = {
    id: number;
    title: string;
    description?: string;
    date: Date;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateDailyStudyRequest = {
    title: string;
    description?: string;
    date: Date;
    duration: number;
}

export type UpdateDailyStudyRequest = {
    title?: string;
    description?: string;
    date?: Date;
    duration?: number;
}

export function toDailyStudyResponse(dailyStudy: DailyStudy): DailyStudyResponse {
    return {
        id: dailyStudy.id,
        title: dailyStudy.title,
        description: dailyStudy.description || undefined,
        date: dailyStudy.date,
        duration: dailyStudy.duration,
        createdAt: dailyStudy.createdAt,
        updatedAt: dailyStudy.updatedAt
    }
}
