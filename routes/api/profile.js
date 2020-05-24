const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")

const Profile = require("../../models/Profile")

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  console.log("Request from Get: ", req)
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"])

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   POST api/profile/
// @desc    Create or Update a profile
// @access  Private

router.post("/", auth, async (req, res) => {
  const {
    website,
    location,
    youtube,
    facebook,
    instagram,
    twitter,
    github,
  } = req.body

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (youtube) profileFields.youtube = youtube
  if (facebook) profileFields.facebook = facebook
  if (instagram) profileFields.instagram = instagram
  if (twitter) profileFields.twitter = twitter
  if (github) profileFields.github = github

  try {
    let profile = await Profile.findOne({ user: req.user.id })

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      return res.json(profile)
    }
    // Create a new profile
    profile = new Profile(profileFields)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
module.exports = router
