import { validation } from "../validation/validation";
import { CourseValidation } from "../validation/course-validation";
import {
  type CreateCourseRequest,
  type UpdateCourseRequest,
  toCourseResponse,
  type CourseResponse,
} from "../model/corurse-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class CourseService {
  static async create(request: CreateCourseRequest): Promise<CourseResponse> {
    const createRequest = validation.validate(
      CourseValidation.CREATE,
      request
    ) as CreateCourseRequest;

    const existingCourse = await prismaClient.course.findUnique({
      where: {
        code: createRequest.code,
      },
    });

    if (existingCourse) {
      throw new ResponseError(400, "Course with this code already exists");
    }

    const course = await prismaClient.course.create({
      data: createRequest,
    });

    return toCourseResponse(course);
  }

  static async getAll(): Promise<CourseResponse[]> {
    const courses = await prismaClient.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses.map((course) => toCourseResponse(course));
  }

  static async getById(id: number): Promise<CourseResponse> {
    const course = await prismaClient.course.findUnique({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    return toCourseResponse(course);
  }

  static async update(
    id: number,
    request: UpdateCourseRequest
  ): Promise<CourseResponse> {
    const updateRequest = validation.validate(
      CourseValidation.UPDATE,
      request
    ) as UpdateCourseRequest;

    const course = await prismaClient.course.findUnique({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    if (updateRequest.code && updateRequest.code !== course.code) {
      const existingCourse = await prismaClient.course.findUnique({
        where: {
          code: updateRequest.code,
        },
      });

      if (existingCourse) {
        throw new ResponseError(400, "Course with this code already exists");
      }
    }

    const updatedCourse = await prismaClient.course.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return toCourseResponse(updatedCourse);
  }

  static async delete(id: number): Promise<void> {
    const course = await prismaClient.course.findUnique({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    await prismaClient.course.delete({
      where: {
        id: id,
      },
    });
  }
}
