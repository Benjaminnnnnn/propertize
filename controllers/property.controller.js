import mongoose from "mongoose";
import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

// connect to cloud photo storage api
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).limit(req.query_end);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetail = async (req, res) => {};

const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, photo, email, propertyType } =
      req.body;

    // Start a new session
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.findOne({ email }).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    // upload property photo to cloud
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });
    user.allProperties.push(newProperty._id);
    user.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {};

const deleteProperty = async (req, res) => {};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
