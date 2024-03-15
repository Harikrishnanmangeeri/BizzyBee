const userSchema = require("../Modal/user");
const { joiuserschema } = require("../Modal/validationschema");
const bcrypt = require("bcrypt");

module.exports = {
  registration: async (req, res) => {
    const { value, error } = joiuserschema.validate(req.body);
    const { username, password, email, contact } = value;
    console.log(req.body)
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
    const { contact , email , password} = req.body;
    const user = await userschema.find({})
  },
  profile: async (req, res) => {},
};
