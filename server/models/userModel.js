const mongoose = require('mongoose')

const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre('save',async function(){
    if(! this.isModified('password'))
        return 

    this.password = await bcrypt.hash(this.password,12)
    

})
module.exports = mongoose.model("User", userSchema);