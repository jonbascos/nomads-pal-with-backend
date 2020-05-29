const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

const Profile = require("../../models/Profile")
const User = require("../../models/User")

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name"
    )

    if (!profile) {
      res.status(400).json({ msg: "No profile found for this user" })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   POST api/profile
// @desc    Create and Update a profile
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
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      return res.json(profile)
    }
    // Create
    profile = new Profile(profileFields)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
  res.send("hello")
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name")
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by userID
// @access  Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", "name")

    if (!profile) return res.status(400).json({ msg: "Profile not found" })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" })
    }
    res.status(500).send("Server Error")
  }
})

// @route   DELETE api/profile
// @desc    Delete a profle
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    // Delete profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Delete user
    await User.findOneAndDelete({ _id: req.user.id })

    res.send({ msg: "User deleted" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
