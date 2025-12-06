import { validation } from "../validation/validation";
import { AssignmentValidation } from "../validation/assignment-validation";
import {
  type CreateAssignmentRequest,
  type UpdateAssignmentRequest,
  toAssignmentResponse,
  type AssignmentResponse,
} from "../model/assignment-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AssignmentService {
  static async create(
    request: CreateAssignmentRequest
  ): Promise<AssignmentResponse> {
    const createRequest = validation.validate(
      AssignmentValidation.CREATE,
      request
    ) as CreateAssignmentRequest;

    const course = await prismaClient.course.findUnique({
      where: {
        id: createRequest.courseId,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    const assignment = await prismaClient.assignment.create({
      data: createRequest,
    });

    return toAssignmentResponse(assignment);
  }

  static async getAll(): Promise<AssignmentResponse[]> {
    const assignments = await prismaClient.assignment.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });

    return assignments.map((assignment) => toAssignmentResponse(assignment));
  }

  static async getByCourse(courseId: number): Promise<AssignmentResponse[]> {
    const course = await prismaClient.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    const assignments = await prismaClient.assignment.findMany({
      where: {
        courseId: courseId,
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    return assignments.map((assignment) => toAssignmentResponse(assignment));
  }

  static async getById(id: number): Promise<AssignmentResponse> {
    const assignment = await prismaClient.assignment.findUnique({
      where: {
        id: id,
      },
    });

    if (!assignment) {
      throw new ResponseError(404, "Assignment not found");
    }

    return toAssignmentResponse(assignment);
  }

  static async update(
    id: number,
    request: UpdateAssignmentRequest
  ): Promise<AssignmentResponse> {
    const updateRequest = validation.validate(
      AssignmentValidation.UPDATE,
      request
    ) as UpdateAssignmentRequest;

    const assignment = await prismaClient.assignment.findUnique({
      where: {
        id: id,
      },
    });

    if (!assignment) {
      throw new ResponseError(404, "Assignment not found");
    }

    const updatedAssignment = await prismaClient.assignment.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return toAssignmentResponse(updatedAssignment);
  }

  static async delete(id: number): Promise<void> {
    const assignment = await prismaClient.assignment.findUnique({
      where: {
        id: id,
      },
    });

    if (!assignment) {
      throw new ResponseError(404, "Assignment not found");
    }

    await prismaClient.assignment.delete({
      where: {
        id: id,
      },
    });
  }
}
