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
      check(),
    ],
  ],
  async (req, res) => {}
)

module.exports = router
