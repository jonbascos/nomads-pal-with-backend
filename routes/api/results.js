const express = require("express")
const router = express.Router()

// @route   GET api/results
// @desc    TEST route
// @access  Public

router.get("/results", (req, res) => res.send("Results Route"))

module.exports = router
