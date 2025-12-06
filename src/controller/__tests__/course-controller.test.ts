import { CourseController } from "../../controller/course-controller";
import { CourseService } from "../../service/course-service";
import type { Request, Response, NextFunction } from "express";

jest.mock("../../service/course-service");

describe("CourseController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a course successfully", async () => {
      const mockCourseData = {
        name: "Mathematics",
        code: "MATH101",
        credits: 3,
      };
      const mockCourseResponse = {
        id: 1,
        ...mockCourseData,
      };

      mockRequest.body = mockCourseData;
      (CourseService.create as jest.Mock).mockResolvedValue(mockCourseResponse);

      await CourseController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(CourseService.create).toHaveBeenCalledWith(mockCourseData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockCourseResponse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle create errors", async () => {
      const mockError = new Error("Create failed");
      mockRequest.body = { name: "Test" };
      (CourseService.create as jest.Mock).mockRejectedValue(mockError);

      await CourseController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should get all courses successfully", async () => {
      const mockCourses = [
        { id: 1, name: "Math", code: "MATH101" },
        { id: 2, name: "Physics", code: "PHYS101" },
      ];

      (CourseService.getAll as jest.Mock).mockResolvedValue(mockCourses);

      await CourseController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(CourseService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockCourses });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getAll errors", async () => {
      const mockError = new Error("Get all failed");
      (CourseService.getAll as jest.Mock).mockRejectedValue(mockError);

      await CourseController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get course by id successfully", async () => {
      const mockCourse = { id: 1, name: "Math", code: "MATH101" };
      mockRequest.params = { id: "1" };

      (CourseService.getById as jest.Mock).mockResolvedValue(mockCourse);

      await CourseController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(CourseService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockCourse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getById errors", async () => {
      const mockError = new Error("Course not found");
      mockRequest.params = { id: "999" };
      (CourseService.getById as jest.Mock).mockRejectedValue(mockError);

      await CourseController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update course successfully", async () => {
      const mockUpdateData = {
        name: "Advanced Math",
        code: "MATH201",
      };
      const mockUpdatedCourse = {
        id: 1,
        ...mockUpdateData,
      };

      mockRequest.params = { id: "1" };
      mockRequest.body = mockUpdateData;
      (CourseService.update as jest.Mock).mockResolvedValue(mockUpdatedCourse);

      await CourseController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(CourseService.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUpdatedCourse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle update errors", async () => {
      const mockError = new Error("Update failed");
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Test" };
      (CourseService.update as jest.Mock).mockRejectedValue(mockError);

      await CourseController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete course successfully", async () => {
      mockRequest.params = { id: "1" };
      (CourseService.delete as jest.Mock).mockResolvedValue(undefined);

      await CourseController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(CourseService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: "OK" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle delete errors", async () => {
      const mockError = new Error("Delete failed");
      mockRequest.params = { id: "1" };
      (CourseService.delete as jest.Mock).mockRejectedValue(mockError);

      await CourseController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
