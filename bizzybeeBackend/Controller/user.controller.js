const userSchema = require("../Modal/user");
const { joiuserschema } = require("../Modal/validationschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registration: async (req, res) => {
    const { value, error } = joiuserschema.validate(req.body);
    const { username, password, email, contact } = value;
    console.log(req.body);
    if (error) {
      res.json(error.message);
    } else {
      const user = await userSchema.find({ contact: contact });
      if (user.length > 0) {
        return res.json("already registred");
      } else {
        await userSchema.create({
          contact: contact,
          username: username,
          email: email,
          password: await bcrypt.hash(password, 10),
          created_at: Date(),
        });
        res.json("This registration add to database sucessfully");
      }
    }
  },
  login: async (req, res) => {
    const { value, error } = joiuserschema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.json(error.message);
    }

    try {
      const user = await userSchema.findOne({ email: email });

      if (!user) {
        return res.send("User unavailable");
      }

      const checkpass = await bcrypt.compare(password, user.password);

      if (!checkpass) {
        return res.json("Password incorrect");
      }

      const resp = {
        id: user.id,
      };

      const token = jwt.sign(resp, process.env.ACCESS_USERTOKEN_SECRET, {
        expiresIn: 86400,
      });

      res.send({
        status: "success",
        auth: true,
        token: token,
        isBlocked: user.isBlocked,
        id: user.id,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const profile = await userSchema.findOne({ _id: res.token });
  
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json("User not found!");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
};
