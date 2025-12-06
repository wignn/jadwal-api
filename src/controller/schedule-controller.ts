import { ScheduleService } from "../service/schedule-service";
import type {
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from "../model/schedule-model";
import type { Request, Response, NextFunction } from "express";

export class ScheduleController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateScheduleRequest = req.body as CreateScheduleRequest;
      const response = await ScheduleService.create(request);
      res.status(201).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ScheduleService.getAll();
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = parseInt(req.params.courseId as string);
      const response = await ScheduleService.getByCourse(courseId);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const response = await ScheduleService.getById(id);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const request: UpdateScheduleRequest = req.body as UpdateScheduleRequest;
      const response = await ScheduleService.update(id, request);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await ScheduleService.delete(id);
      res.status(200).json({ data: "OK" });
    } catch (err) {
      next(err);
    }
  }
}
