  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing spaces
      minlength: 2, // Minimum length of the name
      maxlength: 100, // Maximum length of the name
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email uniqueness in the collection
      trim: true, // Removes leading and trailing spaces
      lowercase: true, // Converts email to lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum length of the password
    },
    hissabs: [{
      type: Schema.Types.ObjectId,
      ref: 'Hissab' // Reference to Hisaab model
    }],
    bgcolor:String,
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  });

  const UserModel = mongoose.model('User', userSchema);
  module.exports = UserModel;
