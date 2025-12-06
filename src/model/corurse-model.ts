import type { Course } from '../generated/index.d';

export type CourseResponse = {
    id: number;
    code: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCourseRequest = {
    code: string;
    name: string;
}

export type UpdateCourseRequest = {
    code?: string;
    name?: string;
}

export function toCourseResponse(course: Course): CourseResponse {
    return {
        id: course.id,
        code: course.code,
        name: course.name,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
    }
}