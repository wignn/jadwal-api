import { validation } from "../validation/validation";
import { ScheduleValidation } from "../validation/schedule-validation";
import {
  type CreateScheduleRequest,
  type UpdateScheduleRequest,
  toScheduleResponse,
  type ScheduleResponse,
} from "../model/schedule-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class ScheduleService {
  static async create(
    request: CreateScheduleRequest
  ): Promise<ScheduleResponse> {
    const createRequest = validation.validate(
      ScheduleValidation.CREATE,
      request
    ) as CreateScheduleRequest;

    const course = await prismaClient.course.findUnique({
      where: {
        id: createRequest.courseId,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    const schedule = await prismaClient.schedule.create({
      data: createRequest,
    });

    return toScheduleResponse(schedule);
  }

  static async getAll(): Promise<ScheduleResponse[]> {
    const schedules = await prismaClient.schedule.findMany({
      orderBy: {
        day: "asc",
      },
    });

    return schedules.map((schedule) => toScheduleResponse(schedule));
  }

  static async getByCourse(courseId: number): Promise<ScheduleResponse[]> {
    const course = await prismaClient.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new ResponseError(404, "Course not found");
    }

    const schedules = await prismaClient.schedule.findMany({
      where: {
        courseId: courseId,
      },
      orderBy: {
        day: "asc",
      },
    });

    return schedules.map((schedule) => toScheduleResponse(schedule));
  }

  static async getById(id: number): Promise<ScheduleResponse> {
    const schedule = await prismaClient.schedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new ResponseError(404, "Schedule not found");
    }

    return toScheduleResponse(schedule);
  }

  static async update(
    id: number,
    request: UpdateScheduleRequest
  ): Promise<ScheduleResponse> {
    const updateRequest = validation.validate(
      ScheduleValidation.UPDATE,
      request
    ) as UpdateScheduleRequest;

    const schedule = await prismaClient.schedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new ResponseError(404, "Schedule not found");
    }

    const updatedSchedule = await prismaClient.schedule.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return toScheduleResponse(updatedSchedule);
  }

  static async delete(id: number): Promise<void> {
    const schedule = await prismaClient.schedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new ResponseError(404, "Schedule not found");
    }

    await prismaClient.schedule.delete({
      where: {
        id: id,
      },
    });
  }
}
