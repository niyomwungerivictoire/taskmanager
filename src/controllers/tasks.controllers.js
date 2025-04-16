
// controllers/tasks.controller.js
import {
  createTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService
} from "../services/tasks.service.js";

export const createTask = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized user!" });
    }
    
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Please provide all required fields!" });
    }
    
    const taskData = {
      title,
      description
    };
    
    const task = await createTaskService(user, taskData);
    
    return res.status(201).json({ 
      success: true,
      message: "Task created successfully!",
      data: task 
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error!", 
      error: error.message 
    });
  }
};

export const getAllTasks = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(401).json({ success: false, message: "User must be logged in" });
    }
    
    const userTasks = await getAllTasksService(user);
    
    return res.status(200).json({
      success: true,
      count: userTasks.length,
      data: userTasks
    });
  } catch (error) {
    console.error("Get all tasks error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error!", 
      error: error.message 
    });
  }
};

export const getTaskById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  
  try {
    if (!user) {
      return res.status(401).json({ success: false, message: "User must be logged in" });
    }
    
    const task = await getTaskByIdService(user, id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    
    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error("Get task by ID error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error!", 
      error: error.message 
    });
  }
};

export const updateTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const updates = req.body;
  
  try {
    if (!user) {
      return res.status(401).json({ success: false, message: "User must be logged in" });
    }
    
    const task = await updateTaskService(user, id, updates);
    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error!", 
      error: error.message 
    });
  }
};

export const deleteTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  
  try {
    if (!user) {
      return res.status(401).json({ success: false, message: "User must be logged in" });
    }
    
    const task = await deleteTaskService(user, id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error!", 
      error: error.message 
    });
  }
};

