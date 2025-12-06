import { DailyStudyController } from "../../controller/daily-study-controller";
import { DailyStudyService } from "../../service/daily-study-service";
import type { Request, Response, NextFunction } from "express";

jest.mock("../../service/daily-study-service");

describe("DailyStudyController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {},
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
    it("should create a daily study successfully", async () => {
      const mockDailyStudyData = {
        date: new Date("2024-12-01"),
        subject: "Mathematics",
        duration: 120,
        notes: "Studied calculus",
      };
      const mockDailyStudyResponse = {
        id: 1,
        ...mockDailyStudyData,
      };

      mockRequest.body = mockDailyStudyData;
      (DailyStudyService.create as jest.Mock).mockResolvedValue(mockDailyStudyResponse);

      await DailyStudyController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.create).toHaveBeenCalledWith(mockDailyStudyData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockDailyStudyResponse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle create errors", async () => {
      const mockError = new Error("Create failed");
      mockRequest.body = { subject: "Math" };
      (DailyStudyService.create as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should get all daily studies successfully", async () => {
      const mockDailyStudies = [
        { id: 1, subject: "Math", duration: 120, date: new Date("2024-12-01") },
        { id: 2, subject: "Physics", duration: 90, date: new Date("2024-12-02") },
      ];

      (DailyStudyService.getAll as jest.Mock).mockResolvedValue(mockDailyStudies);

      await DailyStudyController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockDailyStudies });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getAll errors", async () => {
      const mockError = new Error("Get all failed");
      (DailyStudyService.getAll as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getByDateRange", () => {
    it("should get daily studies by date range successfully", async () => {
      const mockDailyStudies = [
        { id: 1, subject: "Math", duration: 120, date: new Date("2024-12-01") },
        { id: 2, subject: "Physics", duration: 90, date: new Date("2024-12-02") },
      ];
      mockRequest.query = {
        startDate: "2024-12-01",
        endDate: "2024-12-31",
      };

      (DailyStudyService.getByDateRange as jest.Mock).mockResolvedValue(mockDailyStudies);

      await DailyStudyController.getByDateRange(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.getByDateRange).toHaveBeenCalledWith(
        new Date("2024-12-01"),
        new Date("2024-12-31")
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockDailyStudies });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getByDateRange errors", async () => {
      const mockError = new Error("Get by date range failed");
      mockRequest.query = {
        startDate: "2024-12-01",
        endDate: "2024-12-31",
      };
      (DailyStudyService.getByDateRange as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.getByDateRange(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get daily study by id successfully", async () => {
      const mockDailyStudy = {
        id: 1,
        subject: "Math",
        duration: 120,
        date: new Date("2024-12-01"),
      };
      mockRequest.params = { id: "1" };

      (DailyStudyService.getById as jest.Mock).mockResolvedValue(mockDailyStudy);

      await DailyStudyController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockDailyStudy });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getById errors", async () => {
      const mockError = new Error("Daily study not found");
      mockRequest.params = { id: "999" };
      (DailyStudyService.getById as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update daily study successfully", async () => {
      const mockUpdateData = {
        subject: "Advanced Math",
        duration: 150,
        notes: "Studied advanced topics",
      };
      const mockUpdatedDailyStudy = {
        id: 1,
        ...mockUpdateData,
        date: new Date("2024-12-01"),
      };

      mockRequest.params = { id: "1" };
      mockRequest.body = mockUpdateData;
      (DailyStudyService.update as jest.Mock).mockResolvedValue(mockUpdatedDailyStudy);

      await DailyStudyController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUpdatedDailyStudy });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle update errors", async () => {
      const mockError = new Error("Update failed");
      mockRequest.params = { id: "1" };
      mockRequest.body = { subject: "Math" };
      (DailyStudyService.update as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete daily study successfully", async () => {
      mockRequest.params = { id: "1" };
      (DailyStudyService.delete as jest.Mock).mockResolvedValue(undefined);

      await DailyStudyController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(DailyStudyService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: "OK" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle delete errors", async () => {
      const mockError = new Error("Delete failed");
      mockRequest.params = { id: "1" };
      (DailyStudyService.delete as jest.Mock).mockRejectedValue(mockError);

      await DailyStudyController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
