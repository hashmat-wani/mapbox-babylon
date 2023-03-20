import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const authenticate = async (req, res, next) => {
  try {
    const access_token = req.cookies?.access_token?.split(" ")[1];

    try {
      const { _id, email } = await JwtService.verify(access_token);
      req.user = { _id, email, access_token };
    } catch (err) {
      return next(err);
    }

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
