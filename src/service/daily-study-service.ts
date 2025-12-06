import { validation } from "../validation/validation";
import { DailyStudyValidation } from "../validation/daily-study-validation";
import {
  type CreateDailyStudyRequest,
  type UpdateDailyStudyRequest,
  toDailyStudyResponse,
  type DailyStudyResponse,
} from "../model/daily-study-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class DailyStudyService {
  static async create(
    request: CreateDailyStudyRequest
  ): Promise<DailyStudyResponse> {
    const createRequest = validation.validate(
      DailyStudyValidation.CREATE,
      request
    ) as CreateDailyStudyRequest;

    const dailyStudy = await prismaClient.dailyStudy.create({
      data: createRequest,
    });

    return toDailyStudyResponse(dailyStudy);
  }

  static async getAll(): Promise<DailyStudyResponse[]> {
    const dailyStudies = await prismaClient.dailyStudy.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return dailyStudies.map((dailyStudy) => toDailyStudyResponse(dailyStudy));
  }

  static async getByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<DailyStudyResponse[]> {
    const dailyStudies = await prismaClient.dailyStudy.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return dailyStudies.map((dailyStudy) => toDailyStudyResponse(dailyStudy));
  }

  static async getById(id: number): Promise<DailyStudyResponse> {
    const dailyStudy = await prismaClient.dailyStudy.findUnique({
      where: {
        id: id,
      },
    });

    if (!dailyStudy) {
      throw new ResponseError(404, "Daily study not found");
    }

    return toDailyStudyResponse(dailyStudy);
  }

  static async update(
    id: number,
    request: UpdateDailyStudyRequest
  ): Promise<DailyStudyResponse> {
    const updateRequest = validation.validate(
      DailyStudyValidation.UPDATE,
      request
    ) as UpdateDailyStudyRequest;

    const dailyStudy = await prismaClient.dailyStudy.findUnique({
      where: {
        id: id,
      },
    });

    if (!dailyStudy) {
      throw new ResponseError(404, "Daily study not found");
    }

    const updatedDailyStudy = await prismaClient.dailyStudy.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });

    return toDailyStudyResponse(updatedDailyStudy);
  }

  static async delete(id: number): Promise<void> {
    const dailyStudy = await prismaClient.dailyStudy.findUnique({
      where: {
        id: id,
      },
    });

    if (!dailyStudy) {
      throw new ResponseError(404, "Daily study not found");
    }

    await prismaClient.dailyStudy.delete({
      where: {
        id: id,
      },
    });
  }
}
