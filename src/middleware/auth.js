import User from "../models/User.js";
import ApiError from "../utils/errorHandlers.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
    try {
      // biome-ignore lint/style/useConst: <explanation>
      let token;
  
      const authHeader = req.headers.authorization;
      token = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : null;
      if (!token) {
        return next(new ApiError('Not authorized to access this route', 401));
      }
  
      // Verify token
      const { valid, expired, decoded } = verifyToken(token);
  
      if (!valid) {
        return next(
          new ApiError(
            expired ? 'Your token has expired' : 'Invalid token',
            401
          )
        );
      }
  
      // Find user by token id
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(
          new ApiError('The user belonging to this token no longer exists', 401)
        );
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      next(new ApiError('Not authorized to access this route', 401));
    }
  };