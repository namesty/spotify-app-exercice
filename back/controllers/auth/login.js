const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {

    if (error) res.status(500).json({ message: "Hubo un error" });

    if (info) res.status(400).json({ message: info });

    const payload = {
      sub: user._id,
      exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
      username: user.username
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

    res.status(200).json({ data: { token } });
  })(req, res);
};
