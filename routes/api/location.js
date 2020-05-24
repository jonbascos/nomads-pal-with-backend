const express = require("express")
const router = express.Router()

// @route   GET api/addLocation
// @desc    TEST route
// @access  Public

router.get("/addLocation", (req, res) => res.send("Add Location Route"))

module.exports = router
