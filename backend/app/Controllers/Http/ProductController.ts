import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";

export default class EmployeesController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      // Authenticate the user
      await auth.use("api").authenticate();

      // Fetch employees
      const employees = await Employee.query().orderBy("id", "asc");

      console.log(employees);

      // Return success response with employees data
      return response.status(200).json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);

      // Check if the error is related to authentication
      if (
        error.code === "E_INVALID_API_TOKEN" ||
        error.code === "E_UNAUTHORIZED_ACCESS"
      ) {
        return response.status(401).json({
          success: false,
          message: "Authentication failed",
          error: error.message,
        });
      }

      // Return a general error response
      return response.status(500).json({
        success: false,
        message: "Failed to fetch employees",
        error: error.message,
      });
    }
  }
  public async update({ request, response, auth }: HttpContextContract) {
    try {
      // Authenticate the user
      await auth.use("api").authenticate();

      // Retrieve employee ID from the URL parameters
      const employeeId = request.param("id");

      // Find the employee by ID
      const employee = await Employee.find(employeeId);

      if (!employee) {
        return response.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      // Update employee details with request data
      const updatedData = request.only([
        "employee_id",
        "name",
        "age",
        "salary",
        "phonenumber",
        "address",
        "pincode",
      ]);

      employee.merge(updatedData);
      await employee.save();

      // Return success response with updated employee data
      return response.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
      });
    } catch (error) {
      console.error("Error updating employee:", error);

      // Check if the error is related to authentication
      if (
        error.code === "E_INVALID_API_TOKEN" ||
        error.code === "E_UNAUTHORIZED_ACCESS"
      ) {
        return response.status(401).json({
          success: false,
          message: "Authentication failed",
          error: error.message,
        });
      }

      // Return a general error response
      return response.status(500).json({
        success: false,
        message: "Failed to update employee",
        error: error.message,
      });
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      // Authenticate the user
      await auth.use("api").authenticate();

      // Create a new employee with request data
      const employeeData = request.only([
        "name",
        "age",
        "salary",
        "phonenumber",
        "address",
        "pincode",
      ]);

      const employee = await Employee.create(employeeData);

      // Return success response with created employee data
      return response.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });
    } catch (error) {
      console.error("Error creating employee:", error);

      // Check if the error is related to authentication
      if (
        error.code === "E_INVALID_API_TOKEN" ||
        error.code === "E_UNAUTHORIZED_ACCESS"
      ) {
        return response.status(401).json({
          success: false,
          message: "Authentication failed",
          error: error.message,
        });
      }

      // Return a general error response
      return response.status(500).json({
        success: false,
        message: "Failed to create employee",
        error: error.message,
      });
    }
  }

  public async delete({ request, response, auth }: HttpContextContract) {
    try {
      // Authenticate the user
      await auth.use("api").authenticate();

      // Retrieve employee ID from the URL parameters
      const employeeId = request.param("id");

      // Find the employee by ID
      const employee = await Employee.find(employeeId);

      if (!employee) {
        return response.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      // Delete the employee
      await employee.delete();

      // Return success response
      return response.status(200).json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);

      // Check if the error is related to authentication
      if (
        error.code === "E_INVALID_API_TOKEN" ||
        error.code === "E_UNAUTHORIZED_ACCESS"
      ) {
        return response.status(401).json({
          success: false,
          message: "Authentication failed",
          error: error.message,
        });
      }

      // Return a general error response
      return response.status(500).json({
        success: false,
        message: "Failed to delete employee",
        error: error.message,
      });
    }
  }
}
