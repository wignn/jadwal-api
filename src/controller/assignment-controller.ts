import { AssignmentService } from "../service/assignment-service";
import type {
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from "../model/assignment-model";
import type { Request, Response, NextFunction } from "express";

export class AssignmentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateAssignmentRequest =
        req.body as CreateAssignmentRequest;
      const response = await AssignmentService.create(request);
      res.status(201).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AssignmentService.getAll();
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = parseInt(req.params.courseId as string);
      const response = await AssignmentService.getByCourse(courseId);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const response = await AssignmentService.getById(id);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const request: UpdateAssignmentRequest =
        req.body as UpdateAssignmentRequest;
      const response = await AssignmentService.update(id, request);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await AssignmentService.delete(id);
      res.status(200).json({ data: "OK" });
    } catch (err) {
      next(err);
    }
  }
}
