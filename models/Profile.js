const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
