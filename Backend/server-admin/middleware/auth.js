import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (!req.admin) {
        return res.status(401).json({ message: 'Admin not found' });
      }

      if (!req.admin.isActive) {
        return res.status(401).json({ message: 'Admin account is deactivated' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ 
        message: `Admin role ${req.admin.role} is not authorized to access this route` 
      });
    }
    next();
  };
};

export const checkPermission = (module, action) => {
  return (req, res, next) => {
    if (!req.admin.hasPermission(module, action)) {
      return res.status(403).json({ 
        message: `Insufficient permissions to ${action} ${module}` 
      });
    }
    next();
  };
};