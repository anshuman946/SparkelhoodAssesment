import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import incidentRoutes from "./routes/incidents.js"

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/incidents", incidentRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-safety-incidents"

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err)
    process.exit(1)
  })

export default app
