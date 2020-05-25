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
    bio,
    youtube,
    facebook,
    instagram,
    twitter,
    linkedin,
    github,
  } = req.body

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio

  // Build social object
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (facebook) profileFields.social.facebook = facebook
  if (instagram) profileFields.social.instagram = instagram
  if (twitter) profileFields.social.twitter = twitter
  if (linkedin) profileFields.social.linkedin = linkedin
  if (github) profileFields.social.github = github

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

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await (
      await Profile.findOne({ user: req.params.user_id })
    ).populate("user", ["name"])

    if (!profile) return res.status(400).json({ mgs: "Profile not found" })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})
module.exports = router
