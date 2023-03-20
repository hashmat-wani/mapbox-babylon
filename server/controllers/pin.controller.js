import Joi from "joi";
import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";

const pinsController = {
  async createPin(req, res, next) {
    const validationSchema = Joi.object({
      user: Joi.string().required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      comment: Joi.string().required(),
    });

    const { comment, longitude, latitude } = req.body;
    const { _id: user } = req.user;
    const { error } = validationSchema.validate({
      comment,
      longitude,
      latitude,
      user,
    });

    if (error) {
      return next(error);
    }

    try {
      const userDoc = await User.findById(user);

      if (!userDoc) {
        return next(CustomErrorHandler.notFound());
      }

      await Pin.create({
        comment,
        longitude,
        latitude,
        user: userDoc?._id,
      });
      res
        .status(201)
        .json({ success: "true", message: "Pin created successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async fetchAllPins(req, res, next) {
    try {
      // pins of activated users  only
      const pins = await Pin.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $match: {
            $and: [{ "user.isActive": true }],
          },
        },
        {
          $project: {
            "user.firstName": 1,
            "user.lastName": 1,
            "user.avatar": 1,
            "user._id": 1,
            comment: 1,
            longitude: 1,
            latitude: 1,
            createdAt: 1,
          },
        },
      ]);

      return res.status(200).json({ success: true, pins });
    } catch (err) {
      return next(err);
    }
  },

  async deletePin(req, res, next) {
    try {
      const { id } = req.params;

      await Pin.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

export default pinsController;
