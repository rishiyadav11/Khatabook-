const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hissabSchema = new Schema({
  title: {
    type: String,
    trim: true, // Removes leading and trailing spaces
    minlength: 1, // Minimum length of the title
    maxlength: 100, // Maximum length of the title
    required: true // Ensures the title is provided
  },
  content: {
    type: String,
    required: true // Ensures content is provided
  },
  isShareable: {
    type: Boolean,
    required: true // Ensures isShareable is provided
  }, 
  isEditable: {
    type: Boolean,
    required: true // Ensures isEditable is provided
  },
  isEncrypted: Boolean, // To store encrypted content
  accessPasswordHash: String, // To store hashed password for accessing encrypted content
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Reference to the User model
    required: true // Ensures every hissab is linked to an author
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Hissab', hissabSchema);
 