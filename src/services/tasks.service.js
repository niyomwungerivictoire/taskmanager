// ----------------------
// TASK SERVICES
// ----------------------

import Task from "../models/Task.js";
import User from "../models/User.js";
import ApiError from "../utils/errorHandlers.js";

/**
 * Create a new task
 * @param {Object} user - Current user
 * @param {Object} taskData - Task details
 * @returns {Object} Created task
 */
export const createTaskService = async (user, taskData) => {
  const userData = await User.findById(user.id);
  if (!userData) {
    throw new ApiError(`User with id=${user.id} not found`, 404);
  }
  
  const { title, description } = taskData;
  
  try {
    const newTask = await Task.create({
      user: user.id,
      title,
      description,
    });
    return newTask;
  } catch (error) {
    throw new ApiError("Error creating task", 500);
  }
};

/**
 * Get all tasks for a user
 * @param {Object} user - Current user
 * @returns {Array} User tasks
 */
export const getAllTasksService = async (user) => {
  try {
    const userTasks = await Task.find({ user: user.id }).sort({ createdAt: -1 });
    return userTasks;
  } catch (error) {
    throw new ApiError("Error fetching tasks", 500);
  }
};

/**
 * Get a specific task by ID
 * @param {Object} user - Current user
 * @param {string} taskId - Task ID
 * @returns {Object} Task if found
 */
export const getTaskByIdService = async (user, taskId) => {
  try {
    const task = await Task.findOne({ _id: taskId, user: user.id });
    if (!task) {
      throw new ApiError(`Task with id=${taskId} not found`, 404);
    }
    return task;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Error fetching task", 500);
  }
};

/**
 * Update a task
 * @param {Object} user - Current user
 * @param {string} taskId - Task ID
 * @param {Object} updates - Task updates
 * @returns {Object} Updated task
 */
export const updateTaskService = async (user, taskId, updates) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: user.id },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      throw new ApiError(`Task with id=${taskId} not found or not authorized`, 404);
    }
    
    return task;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Error updating task", 500);
  }
};

/**
 * Delete a task
 * @param {Object} user - Current user
 * @param {string} taskId - Task ID
 * @returns {Object} Deleted task
 */
export const deleteTaskService = async (user, taskId) => {
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: user.id });
    
    if (!task) {
      throw new ApiError(`Task with id=${taskId} not found or not authorized`, 404);
    }
    
    return task;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Error deleting task", 500);
  }
};