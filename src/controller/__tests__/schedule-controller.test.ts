import { ScheduleController } from "../../controller/schedule-controller";
import { ScheduleService } from "../../service/schedule-service";
import type { Request, Response, NextFunction } from "express";

jest.mock("../../service/schedule-service");

describe("ScheduleController", () => {
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
    it("should create a schedule successfully", async () => {
      const mockScheduleData = {
        day: "Monday",
        startTime: "09:00",
        endTime: "11:00",
        courseId: 1,
        room: "A101",
      };
      const mockScheduleResponse = {
        id: 1,
        ...mockScheduleData,
      };

      mockRequest.body = mockScheduleData;
      (ScheduleService.create as jest.Mock).mockResolvedValue(mockScheduleResponse);

      await ScheduleController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.create).toHaveBeenCalledWith(mockScheduleData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockScheduleResponse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle create errors", async () => {
      const mockError = new Error("Create failed");
      mockRequest.body = { day: "Monday" };
      (ScheduleService.create as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should get all schedules successfully", async () => {
      const mockSchedules = [
        { id: 1, day: "Monday", startTime: "09:00", courseId: 1 },
        { id: 2, day: "Tuesday", startTime: "10:00", courseId: 2 },
      ];

      (ScheduleService.getAll as jest.Mock).mockResolvedValue(mockSchedules);

      await ScheduleController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockSchedules });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getAll errors", async () => {
      const mockError = new Error("Get all failed");
      (ScheduleService.getAll as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getByCourse", () => {
    it("should get schedules by course successfully", async () => {
      const mockSchedules = [
        { id: 1, day: "Monday", startTime: "09:00", courseId: 1 },
        { id: 2, day: "Wednesday", startTime: "10:00", courseId: 1 },
      ];
      mockRequest.params = { courseId: "1" };

      (ScheduleService.getByCourse as jest.Mock).mockResolvedValue(mockSchedules);

      await ScheduleController.getByCourse(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.getByCourse).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockSchedules });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getByCourse errors", async () => {
      const mockError = new Error("Get by course failed");
      mockRequest.params = { courseId: "1" };
      (ScheduleService.getByCourse as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.getByCourse(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get schedule by id successfully", async () => {
      const mockSchedule = { id: 1, day: "Monday", startTime: "09:00", courseId: 1 };
      mockRequest.params = { id: "1" };

      (ScheduleService.getById as jest.Mock).mockResolvedValue(mockSchedule);

      await ScheduleController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockSchedule });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getById errors", async () => {
      const mockError = new Error("Schedule not found");
      mockRequest.params = { id: "999" };
      (ScheduleService.getById as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update schedule successfully", async () => {
      const mockUpdateData = {
        day: "Tuesday",
        startTime: "10:00",
        endTime: "12:00",
      };
      const mockUpdatedSchedule = {
        id: 1,
        ...mockUpdateData,
        courseId: 1,
      };

      mockRequest.params = { id: "1" };
      mockRequest.body = mockUpdateData;
      (ScheduleService.update as jest.Mock).mockResolvedValue(mockUpdatedSchedule);

      await ScheduleController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUpdatedSchedule });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle update errors", async () => {
      const mockError = new Error("Update failed");
      mockRequest.params = { id: "1" };
      mockRequest.body = { day: "Monday" };
      (ScheduleService.update as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete schedule successfully", async () => {
      mockRequest.params = { id: "1" };
      (ScheduleService.delete as jest.Mock).mockResolvedValue(undefined);

      await ScheduleController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(ScheduleService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: "OK" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle delete errors", async () => {
      const mockError = new Error("Delete failed");
      mockRequest.params = { id: "1" };
      (ScheduleService.delete as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
