const UserModel = require("../models/user");
const bcrypt = require("bcrypt"); //password
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkqug51rv",
  api_key: "298748942386567",
  api_secret: "1lloUDb9GHLE86xZCkAeOe6x2Ro",
});
class UserController {
  static getalluser = async (req, res) => {
    try {
      res.send("hello insert ");
    } catch (error) {
      console.log(error);
    }
  };
  static userinsert = async (req, res) => {
    console.log(req.body);
    const { name, email, password, confirmpassword } = req.body;
    const image = req.files.image;
    console.log(image);

    const imageupload = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "profileimageapi",
    });
    console.log(imageupload);

    const user = await UserModel.findOne({ email: email });
    console.log(user);

    if (user) {
      res
        .status(401)
        .json({ status: "failed", message: "this email is already exists" });
    } else {
      if (name && email && password && confirmpassword) {
        if (password === confirmpassword) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            console.log(hashpassword);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
              },
            });
            await result.save();
            res.status(201).json({
              status: "success",
              message: "Registration successfully",
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(401).json({
            status: "failed",
            message: "password & confirmPassword doesnot match",
          });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "all fields are required" });
      }
    }
  };
}
module.exports = UserController;
