const express = require("express")
const connectDB = require("./config/db")
const app = express()

connectDB()

app.get("/", (req, res) => res.send("API running"))

//initialize middleware
app.use(express.json({ extended: false }))

//Define routes
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/location", require("./routes/api/location"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
