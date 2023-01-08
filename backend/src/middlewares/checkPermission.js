import ApiError from '../error/ApiError';

export default (req, res, next) => {
  try {
    if (req.header('isAdmin') === true) {
      return next();
    }
    if (req.header('userId') === req.params.userId) {
      return next();
    }
    return next(new ApiError(401, 'Invalid userId'));
  } catch (error) {
    error.status = 401;
    error.message = 'Invalid userId';
    return next(error);
  }
};
