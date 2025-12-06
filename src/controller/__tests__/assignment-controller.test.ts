import { AssignmentController } from "../../controller/assignment-controller";
import { AssignmentService } from "../../service/assignment-service";
import type { Request, Response, NextFunction } from "express";

jest.mock("../../service/assignment-service");

describe("AssignmentController", () => {
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
    it("should create an assignment successfully", async () => {
      const mockAssignmentData = {
        title: "Homework 1",
        description: "Complete exercises 1-10",
        dueDate: new Date("2024-12-31"),
        courseId: 1,
      };
      const mockAssignmentResponse = {
        id: 1,
        ...mockAssignmentData,
      };

      mockRequest.body = mockAssignmentData;
      (AssignmentService.create as jest.Mock).mockResolvedValue(mockAssignmentResponse);

      await AssignmentController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.create).toHaveBeenCalledWith(mockAssignmentData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAssignmentResponse });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle create errors", async () => {
      const mockError = new Error("Create failed");
      mockRequest.body = { title: "Test" };
      (AssignmentService.create as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should get all assignments successfully", async () => {
      const mockAssignments = [
        { id: 1, title: "Homework 1", courseId: 1 },
        { id: 2, title: "Homework 2", courseId: 1 },
      ];

      (AssignmentService.getAll as jest.Mock).mockResolvedValue(mockAssignments);

      await AssignmentController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAssignments });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getAll errors", async () => {
      const mockError = new Error("Get all failed");
      (AssignmentService.getAll as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.getAll(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getByCourse", () => {
    it("should get assignments by course successfully", async () => {
      const mockAssignments = [
        { id: 1, title: "Homework 1", courseId: 1 },
        { id: 2, title: "Homework 2", courseId: 1 },
      ];
      mockRequest.params = { courseId: "1" };

      (AssignmentService.getByCourse as jest.Mock).mockResolvedValue(mockAssignments);

      await AssignmentController.getByCourse(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.getByCourse).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAssignments });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getByCourse errors", async () => {
      const mockError = new Error("Get by course failed");
      mockRequest.params = { courseId: "1" };
      (AssignmentService.getByCourse as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.getByCourse(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get assignment by id successfully", async () => {
      const mockAssignment = { id: 1, title: "Homework 1", courseId: 1 };
      mockRequest.params = { id: "1" };

      (AssignmentService.getById as jest.Mock).mockResolvedValue(mockAssignment);

      await AssignmentController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAssignment });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle getById errors", async () => {
      const mockError = new Error("Assignment not found");
      mockRequest.params = { id: "999" };
      (AssignmentService.getById as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update assignment successfully", async () => {
      const mockUpdateData = {
        title: "Updated Homework",
        description: "New description",
      };
      const mockUpdatedAssignment = {
        id: 1,
        ...mockUpdateData,
        courseId: 1,
      };

      mockRequest.params = { id: "1" };
      mockRequest.body = mockUpdateData;
      (AssignmentService.update as jest.Mock).mockResolvedValue(mockUpdatedAssignment);

      await AssignmentController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.update).toHaveBeenCalledWith(1, mockUpdateData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockUpdatedAssignment });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle update errors", async () => {
      const mockError = new Error("Update failed");
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Test" };
      (AssignmentService.update as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete assignment successfully", async () => {
      mockRequest.params = { id: "1" };
      (AssignmentService.delete as jest.Mock).mockResolvedValue(undefined);

      await AssignmentController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(AssignmentService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: "OK" });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should handle delete errors", async () => {
      const mockError = new Error("Delete failed");
      mockRequest.params = { id: "1" };
      (AssignmentService.delete as jest.Mock).mockRejectedValue(mockError);

      await AssignmentController.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
