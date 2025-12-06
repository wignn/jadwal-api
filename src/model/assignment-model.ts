import type { Assignment } from '../generated/index.d';

export type AssignmentResponse = {
    id: number;
    title: string;
    description?: string;
    dueDate: Date;
    status: 'PENDING' | 'DONE' | 'LATE';
    courseId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateAssignmentRequest = {
    title: string;
    description?: string;
    dueDate: Date;
    courseId: number;
}

export type UpdateAssignmentRequest = {
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: 'PENDING' | 'DONE' | 'LATE';
}

export function toAssignmentResponse(assignment: Assignment): AssignmentResponse {
    return {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description || undefined,
        dueDate: assignment.dueDate,
        status: assignment.status,
        courseId: assignment.courseId,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt
    }
}
