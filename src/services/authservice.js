// ----------------------
// AUTH SERVICES
// ----------------------

import { generateToken, verifyToken } from '../utils/jwt.js';
import ApiError from '../utils/errorHandlers.js';
import User from '../models/User.js';

/**
 * Register a new user
 * @param {Object} userData - User data including email, password, name, etc.
 * @returns {Object} User data and authentication token
 */
export const registerUser = async (userData) => {
  const { email } = userData;
  
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError('User with this email already exists', 400);
  }
  
  // Create new user
  const user = await User.create(userData);
  const token = generateToken(user._id);
  
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User data and authentication token
 */
export const loginUser = async (email, password) => {
  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

/**
 * Get current user information
 * @param {string} userId - User ID
 * @returns {Object} User data without sensitive information
 */
export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};