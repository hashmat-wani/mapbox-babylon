const logoutController = {
  async logout(req, res, next) {
    try {
      return res
        .status(200)
        .clearCookie("access_token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({ sucess: true, message: "Logged Out" });
    } catch (err) {
      return next(err);
    }
  },
};

export default logoutController;
