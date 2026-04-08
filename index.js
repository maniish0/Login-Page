const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/login')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
})
const UserModel = mongoose.model("user", UserSchema,"user")

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body)       
  
  UserModel.findOne({ email: email })
    .then(user => {
      console.log("User found:", user)          
      if (user) {
        if (user.password === password) {
          res.json("Login Successfully!")
        } else {
          res.json("The password is incorrect.")
        }
      } else {
        res.json("No record existed.")
      }
    })
    .catch(err => {
      console.log("DB Error:", err)            
      res.status(500).json({ error: err.message })
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})