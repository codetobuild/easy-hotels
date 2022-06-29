import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  // console.log(token);
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    return next();
  });
};

// verify User
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// verify Admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {

    if (req.user.isAdmin) {
      console.log("isadmin == trueee");
      return next();
    } else {
      console.log("isadmin ==  false");
      return next(createError(403, "You are not authorized!"));
    }
  });
};
