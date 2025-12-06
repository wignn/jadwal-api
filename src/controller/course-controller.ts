import { CourseService } from "../service/course-service";
import type {
  CreateCourseRequest,
  UpdateCourseRequest,
} from "../model/corurse-model";
import type { Request, Response, NextFunction } from "express";

export class CourseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCourseRequest = req.body as CreateCourseRequest;
      const response = await CourseService.create(request);
      res.status(201).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CourseService.getAll();
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const response = await CourseService.getById(id);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const request: UpdateCourseRequest = req.body as UpdateCourseRequest;
      const response = await CourseService.update(id, request);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await CourseService.delete(id);
      res.status(200).json({ data: "OK" });
    } catch (err) {
      next(err);
    }
  }
}
