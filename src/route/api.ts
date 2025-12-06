import express from "express";
import { CourseController } from "../controller/course-controller";
import { AssignmentController } from "../controller/assignment-controller";
import { ScheduleController } from "../controller/schedule-controller";
import { DailyStudyController } from "../controller/daily-study-controller";

export const apiRouter = express.Router();

// Course routes
apiRouter.post("/api/courses", CourseController.create);
apiRouter.get("/api/courses", CourseController.getAll);
apiRouter.get("/api/courses/:id", CourseController.getById);
apiRouter.put("/api/courses/:id", CourseController.update);
apiRouter.delete("/api/courses/:id", CourseController.delete);

// Assignment routes
apiRouter.post("/api/assignments", AssignmentController.create);
apiRouter.get("/api/assignments", AssignmentController.getAll);
apiRouter.get("/api/assignments/course/:courseId", AssignmentController.getByCourse);
apiRouter.get("/api/assignments/:id", AssignmentController.getById);
apiRouter.put("/api/assignments/:id", AssignmentController.update);
apiRouter.delete("/api/assignments/:id", AssignmentController.delete);

// Schedule routes
apiRouter.post("/api/schedules", ScheduleController.create);
apiRouter.get("/api/schedules", ScheduleController.getAll);
apiRouter.get("/api/schedules/course/:courseId", ScheduleController.getByCourse);
apiRouter.get("/api/schedules/:id", ScheduleController.getById);
apiRouter.put("/api/schedules/:id", ScheduleController.update);
apiRouter.delete("/api/schedules/:id", ScheduleController.delete);

// Daily Study routes
apiRouter.post("/api/daily-studies", DailyStudyController.create);
apiRouter.get("/api/daily-studies", DailyStudyController.getAll);
apiRouter.get("/api/daily-studies/date-range", DailyStudyController.getByDateRange);
apiRouter.get("/api/daily-studies/:id", DailyStudyController.getById);
apiRouter.put("/api/daily-studies/:id", DailyStudyController.update);
apiRouter.delete("/api/daily-studies/:id", DailyStudyController.delete);
