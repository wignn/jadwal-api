import { DailyStudyService } from "../service/daily-study-service";
import type {
  CreateDailyStudyRequest,
  UpdateDailyStudyRequest,
} from "../model/daily-study-model";
import type { Request, Response, NextFunction } from "express";

export class DailyStudyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateDailyStudyRequest =
        req.body as CreateDailyStudyRequest;
      const response = await DailyStudyService.create(request);
      res.status(201).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DailyStudyService.getAll();
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getByDateRange(req: Request, res: Response, next: NextFunction) {
    try {
      const startDate = new Date(req.query.startDate as string);
      const endDate = new Date(req.query.endDate as string);
      const response = await DailyStudyService.getByDateRange(
        startDate,
        endDate
      );
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const response = await DailyStudyService.getById(id);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const request: UpdateDailyStudyRequest =
        req.body as UpdateDailyStudyRequest;
      const response = await DailyStudyService.update(id, request);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await DailyStudyService.delete(id);
      res.status(200).json({ data: "OK" });
    } catch (err) {
      next(err);
    }
  }
}
