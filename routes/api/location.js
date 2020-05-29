const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")

const Location = require("../../models/Location")

// @route   POST api/location/addLocation
// @desc    Post a new location
// @access  Public

router.get(
  "/",
  [
    auth,
    [
      check("nameOfLocation", "Location name is required").not().isEmpty(),
      check("street", "Please enter a street address").not().isEmpty(),
      check("city", "Please enter a city").not().isEmpty(),
      check("state", "Please enter in a state").not().isEmpty(),
      check("zipcode", "Please enter your zipcode").not().isEmpty(),
      check("text", "Please enter in your text").not().isEmpty(),
    ],
  ],
  async (req, res) => {}
)

module.exports = router
