import { getCurrentUser, loginUser, registerUser } from "../services/authservice.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }
    
    const result = await registerUser({ name, email, password });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }
    console.error("Registration error:", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    const result = await loginUser(email, password);
    
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: result
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    const user = await getCurrentUser(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    next(error);
  }
};