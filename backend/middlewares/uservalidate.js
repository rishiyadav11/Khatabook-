const Joi = require('joi');

const userSchemaJoi = Joi.object({
  name: Joi.string()
    .trim() // Removes leading and trailing spaces
    .min(2) // Minimum length of the name
    .max(100) // Maximum length of the name
    .pattern(/^[a-zA-Z\s]*$/) // Regular expression to validate the name format
    .messages({
      'string.pattern.base': 'Name must only contain letters and spaces.'
    }),
  email: Joi.string()
    .trim() // Removes leading and trailing spaces
    .lowercase() // Converts email to lowercase
    .email() // Validates email format
    .required() // Ensures the email is provided
    .messages({
      'string.email': 'Please fill a valid email address'
    }),
  password: Joi.string()
    .min(8) // Minimum length of the password
    .required() // Ensures the password is provided
    .messages({
      'string.min': 'Password must be at least 8 characters long.'
    })
});

// Middleware for validating user data
const validateUserData = (req, res, next) => {
  console.log('Request Body:', req.body); // Debugging log
  const validationResult = userSchemaJoi.validate(req.body);
  if (validationResult.error) {
    console.log('Validation Error:', validationResult.error.details[0].message); // Debugging log
    // If validation fails, send a 400 Bad Request response with the validation error
    res.status(400).send(validationResult.error.details[0].message);
  } else {
    // If validation passes, proceed to the next middleware or route handler
    next();
  }
};

module.exports = validateUserData;
