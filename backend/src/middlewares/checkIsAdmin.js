import ApiError from '../error/ApiError';

export default (req, res, next) => {
  try {
    if (req.header('isAdmin') === true) {
      return next();
    }
    return next(new ApiError(401, 'Unauthorized access'));
  } catch (error) {
    error.status = 401;
    error.message = 'Unauthorized access';
    return next(error);
  }
};
