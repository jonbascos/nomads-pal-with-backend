const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  nameOfLocation: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
  },
  hours: {
    open: {
      type: String,
    },
    close: {
      type: String,
    },
  },
  daysOpen: {
    sunday: {
      type: Boolean,
    },
    monday: {
      type: Boolean,
    },
    tuesday: {
      type: Boolean,
    },
    wednesday: {
      type: Boolean,
    },
    thursday: {
      type: Boolean,
    },
    friday: {
      type: Boolean,
    },
    saturday: {
      type: Boolean,
    },
  },
  wifiSpeeds: {
    uploadSpeed: {
      type: Number,
    },
    downloadSpeed: {
      type: Number,
    },
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Location = mongoose.model("location", LocationSchema)
