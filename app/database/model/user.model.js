const mongoose = require("mongoose")
const bcyptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
     name: {
          type: String,
          required: true,
          trim: true
     },
     email: {
          type: String,
          require: true,
          unique: true

     },
     balance: {
          type: Number,
          trim: true,
          required: true,
          lowercase: true

     },
     address: [{
          addresstype: { type: String, trim: true, required: true },
          addressDetails: { type: String, trim: true, required: true }
     }],

     created: {
          type: Date,
          default: Date.now()
     },
     update: {
          type: Date,
          default: Date.now()
     },
     password: {
          type: String,
          trim: true,
          required: true
     },
     username: {
          type: String,
          trim: true,
          require: true
     },
     tokens: [
          {
               token: {
                    type: String,
                    required: true
               }
          }
     ]

}, {
     timestamps: true
})
userSchema.methods.toJSON = function () {
     const deleted = ["__v", "password", "tokens"]
     const userData = this.toObject()
     deleted.forEach(d => delete userData[d])
     return userData
}

userSchema.pre('save', async function () {
     const userData = this
     if (userData.isModified("password"))
          userData.password = await bcyptjs.hash(userData.password, 10)
})
userSchema.statics.login = async (email, password) => {
     const userData = await User.findOne({ email })
     if (!userData) throw new Error("invalid email")
     const matched = await bcyptjs.compare(password, userData.password)
     if (!matched) throw new Error("invalid password")
     return userData
}

// for token
userSchema.methods.generateToken = async function () {
     const user = this
     const token = jwt.sign({ _id: user._id }, process.env.JWTKEY)
     user.tokens = user.tokens.concat({ token })
     await user.save()
     return token
}

const User = mongoose.model("User", userSchema)
module.exports = User