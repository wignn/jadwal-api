import type { Schedule } from '../generated/index.d';

export type ScheduleResponse = {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    courseId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateScheduleRequest = {
    day: string;
    startTime: string;
    endTime: string;
    courseId: number;
}

export type UpdateScheduleRequest = {
    day?: string;
    startTime?: string;
    endTime?: string;
}

export function toScheduleResponse(schedule: Schedule): ScheduleResponse {
    return {
        id: schedule.id,
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        courseId: schedule.courseId,
        createdAt: schedule.createdAt,
        updatedAt: schedule.updatedAt
    }
}
